"""Script to convert google sheets CDR-MRV to .json"""

# ------------------ Imports -----------------------
import numpy as np
import json
import pathlib
import gspread # type: ignore
import pandas as pd # type: ignore
from oauth2client.service_account import ServiceAccountCredentials # type: ignore
from ast import literal_eval

# ------------------ Auth -----------------------


SECRET_FILE = str(pathlib.Path.home()) + '/keybase/google-sheets-key.json'
scope = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]
credentials = ServiceAccountCredentials.from_json_keyfile_name(SECRET_FILE, scope)
gc = gspread.authorize(credentials)


gsheet_doc_name = 'CDR MRV Pathway Uncertainties'
avail_pathways = ['DAC', 'BiCRS','EW','TER_BIO','OCEAN_BIO_no_harvest','OCEAN_BIO_harvest','OAE_echem','OAE_mineral']


def get_legend_sheet(gsheet_doc_name: str) -> pd.DataFrame:
    sh = gc.open(gsheet_doc_name)
    sheet = sh.worksheet('Legend')
    data_list = sheet.get_all_values()
    return pd.DataFrame(data_list[1::],columns=data_list[0])

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
    pathway_name = sheet_data[0][1].strip()
    pathway_description = sheet_data[1][1].strip()
    VCL = list(tuple(sheet_data[2][1].replace(" ", "").split(',')))
    equation = sheet_data[3][1].strip()
    return {'pathway_name':pathway_name,'pathway_description':pathway_description, 'VCL':VCL, 'equation':equation}


def clean_dataframe(df: pd.DataFrame) -> pd.DataFrame:
    """Sanitizes dataframe for web formatting"""

    # removes any unneeded cols
    df = df[['element','category','name','quantification_target','description','comments','uncertainty_type','responsibility','uncertainty_impact_min','uncertainty_impact_max','notes','revisions']]

    # replace empty strings with nan
    df = df.replace(r'^\s*$', np.nan, regex=True)

    #removes additional empty rows
    df.dropna(axis=0, how='all', inplace=True)

    # convert to snake_case
    df.columns = df.columns.str.replace(' ','_')

    # splits any multiple comma sep entries into lists. 
    df['uncertainty_type'] = df.uncertainty_type.str.replace(" ","").apply(lambda x: x.split(','))    

    # cast element as string
    df['element'] = df['element'].astype(str)

    # regex magic for leading/trailing whitespace
    df = df.replace(r"^ +| +$", r"", regex=True)

    # converts revision lists into lists from strings
    df['revisions'] = df['revisions'].apply(lambda x: literal_eval(x))

    return df

def write_legend_to_json(df: pd.DataFrame):
    """writes legend df to .json"""
    ldict = dict(zip(df.key, df.description))
    with open(f'../data/legend.json', 'w') as fp:
        json.dump(ldict, fp, indent=4)



def df_to_dict(df: pd.DataFrame, pathway_name: str, pathway_description: str, VCL: str, equation: str) -> dict:
    """Converts DataFrame and metadata into dictionary 

    Parameters
    ----------
    df : pd.DataFrame
        Cleaned Pandas DataFrame
    pathway_name : str
        Name of Pathway
    pathway_description : str
        Description of Pathway
    VCL : str
        VCL
    equation : str
        Equation

    Returns
    -------
    template_dict
        Dictionary containing pathway data and metadata
    """
    template_dict = {"pathway_name":pathway_name.strip().replace(' ','_'), 
                    "pathway_description":pathway_description,
                    "VCL":VCL,
                    "equation":equation,
                    "elements": df.where(df.notnull(), "").to_dict(orient='records')
                    }
    return template_dict
    

def write_to_json(template_dict_list: list):
    """Writes cleaned list of pathway dictionaries and metadata to .json.

    Parameters
    ----------
    template_dict_list : List
    """

    with open(f'../data/pathways.json', 'w') as fp:
        json.dump(template_dict_list, fp, indent=4)

def process_sheet(gsheet_doc_name: str, worksheet_name: str):
    data_list = gsheet_to_data_list(gsheet_doc_name, worksheet_name)
    df = sheet_data_to_dataframe(data_list)
    metadata_dict = sheet_data_to_metadata(data_list)
    cdf = clean_dataframe(df)
    return df_to_dict(cdf,  **metadata_dict)
    # write_to_json(cdf, **metadata_dict)

def process_legend(gsheet_doc_name: str):
    print('Processing Legend sheet..')

    ldf = get_legend_sheet(gsheet_doc_name)
    write_legend_to_json(ldf)

def write_pathways_to_json(avail_pathways: list):
    template_dict_list = []
    for pathway in avail_pathways:

        print(f'Processing pathway: {pathway}')
        template_dict = process_sheet(gsheet_doc_name, pathway)
        template_dict_list.append(template_dict)

    write_to_json(template_dict_list)

write_pathways_to_json(avail_pathways)
process_legend(gsheet_doc_name)


