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
template_dict = {}
scope = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]
credentials = ServiceAccountCredentials.from_json_keyfile_name(SECRET_FILE, scope)
gc = gspread.authorize(credentials)

gsheet_doc_name = 'CDR MRV Pathway Uncertainties'
# worksheet_name = 'DAC'

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

    # removes any uneeded cols
    df = df[['element','category','name','description','comments','uncertainty_type','responsibility','uncertainty_magnitude_min','uncertainty_magnitude_max','notes','revisions']]

    # replace empty strings with nan
    df = df.replace(r'^\s*$', np.nan, regex=True)

    #removes additional empty rows
    df.dropna(axis=0, how='all', inplace=True)

    # convert to snake_case
    df.columns = df.columns.str.replace(' ','_')

    # splits any multiple comma sep entries into lists. 
    df['uncertainty_type'] = df['uncertainty_type'].str.split(',')

    # cast element as string
    df['element'] = df['element'].astype(str)

    # regex magic for leading/trailing whitespace
    df = df.replace(r"^ +| +$", r"", regex=True)

    # set empty vals to empty lists for revisions col
    df['revisions'] = df['revisions'].apply(lambda d: d if isinstance(d, (str,list)) else [])

    # removes any uneeded cols
    df = df[['element','category','name','description','comments','uncertainty_type','responsibility','uncertainty_magnitude_min','uncertainty_magnitude_max','notes','revisions']]

    return df

def write_legend_to_json(df: pd.DataFrame):
    """writes legend df to .json"""
    ldict = dict(zip(df.key, df.description))
    with open(f'../data/legend.json', 'w') as fp:
        json.dump(ldict, fp, indent=4)



def append_template_dict(df: pd.DataFrame,template_dict: dict, pathway_name: str, pathway_description: str, VCL: str, equation: str):
    template_dict_pw = {"pathway_name":pathway_name.strip(), 
                    "pathway_description":pathway_description,
                    "VCL":VCL,
                    "equation":equation,
                    "elements": df.where(df.notnull(), "").to_dict(orient='records')
                    }
    print(template_dict_pw)
    print(type(template_dict_pw))
    template_dict = template_dict.update(template_dict_pw)
    return template_dict
    

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
    append_template_dict(cdf, template_dict,  **metadata_dict)
    # write_to_json(cdf, **metadata_dict)

def process_legend(gsheet_doc_name: str):
    ldf = get_legend_sheet(gsheet_doc_name)
    write_legend_to_json(ldf)



gsheet_doc_name = 'CDR MRV Pathway Uncertainties'
# avail_pathways = ['DAC', 'BiCRS','EW','TER_BIO','OCEAN_BIO_no_harvest','OCEAN_BIO_harvest','OAE_echem','OAE_mineral']
avail_pathways = ['EW']


# for pathway in avail_pathways:
#     print(pathway)
#     process_sheet(gsheet_doc_name, pathway)
#     break
     
# process_legend(gsheet_doc_name)


# take all dataframes and metadata 

# for pathway in pathway_list:
#     pathway_metadata 
#     pathway_df 

#     json_str = df_to_dict(mode='append')

# write json_str_to_json 




