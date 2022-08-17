"""Script to convert google sheets CDR-MRV to .json"""

# ------------------ Imports -----------------------
import numpy as np
import json
import pathlib
import gspread
import pandas as pd
from oauth2client.service_account import ServiceAccountCredentials


# ------------------ Auth -----------------------


SECRET_FILE = str(pathlib.Path.home()) + '/keybase/google-sheets-key.json'

scope = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]
credentials = ServiceAccountCredentials.from_json_keyfile_name(SECRET_FILE, scope)
gc = gspread.authorize(credentials)

gsheet_doc_name = 'CDR MRV Pathway Uncertainties'
worksheet_name = 'DAC'

def get_all_sheets_in_doc(gsheet_doc_name: str) -> list:
    """returns list of all worksheets including ID and name"""
    sh = gc.open(gsheet_doc_name)
    return sh.worksheets()

def gsheet_to_data_list(gsheet_doc_name: str, worksheet_name: str) -> list:
    sh = gc.open(gsheet_doc_name)
    sheet = sh.worksheet(worksheet_name)
    return sheet.get_all_values()


def sheet_data_to_dataframe(data_list: list) -> pd.DataFrame:
    """To match gsheets CDR-MRV schema, first four rows are dataset metadata"""
    return pd.DataFrame(data_list[5::],columns=data_list[4])


def sheet_data_to_metadata(sheet_data: list) -> dict:
    """Assigns sheet metadata"""
    pathway_name = sheet_data[0][1]
    pathway_description = sheet_data[1][1]
    VCL = list(tuple(sheet_data[2][1].split(',')))
    equation = sheet_data[3][1]
    return {'pathway_name':pathway_name,'pathway_description':pathway_description, 'VCL':VCL, 'equation':equation}


def clean_dataframe(df: pd.DataFrame) -> pd.DataFrame:
    """Sanitizes dataframe for web formatting"""

    #replace empty strings with nan
    df = df.replace(r'^\s*$', np.nan, regex=True)

    #convert to snake_case
    df.columns = df.columns.str.replace(' ','_')

    # cast diagram component as string
    df['diagram_component'] = df['diagram_component'].astype(str)

    #regex magic for leading/trailing whitespace
    df = df.replace(r"^ +| +$", r"", regex=True)

    #set empty vals to empty lists for revisions col
    idx = df['revisions'].isna()
    df['revisions'][idx] = df['revisions'][idx].apply(lambda x: "")
    df['revisions'] = df['revisions'].apply(lambda x: x.split(","))

    # removes to, splits into lists
    df['uncertainty_magnitude'] = df['uncertainty_magnitude'].str.replace('to ','').str.split(' ')

    return df

def write_to_json(df: pd.DataFrame, pathway_name: str, pathway_description: str, VCL: str, equation: str,):
    """Writes cleaned dataframe and metadata to .json.

    Parameters
    ----------
    pathway_name : str
        Name of Pathway
    pathway_description : str
        Description of Pathway
    VCL : str
        VCL
    equation : str
        Equation
    df : pd.DataFrame
        Pandas DataFrame of diagram components with additional associated data
    """
    template_dict = {"pathway_name":pathway_name.strip(), 
                    "pathway_description":pathway_description,
                    "VCL":VCL,
                    "equation":equation,
                    "elements": df.where(df.notnull(), "").to_dict(orient='records')
                    }

    fname = pathway_name.strip().replace(' ','_')
    with open(f'../data/{fname}.json', 'w') as fp:
        json.dump(template_dict, fp, indent=4)

def process_sheet(gsheet_doc_name: str, worksheet_name: str):
    data_list = gsheet_to_data_list(gsheet_doc_name, worksheet_name)
    df = sheet_data_to_dataframe(data_list)
    metadata_dict = sheet_data_to_metadata(data_list)
    cdf = clean_dataframe(df)
    write_to_json(cdf, **metadata_dict)


gsheet_doc_name = 'CDR MRV Pathway Uncertainties'


worksheet_name = 'DAC'
# worksheet_name = 'EW'
# worksheet_name = 'OAE_electrochemical'

process_sheet(gsheet_doc_name, worksheet_name)




