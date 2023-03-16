"""Script to convert google sheets CDR-MRV to .json"""

# ------------------ Imports -----------------------
import numpy as np
import pandera as pa
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


gsheet_doc_name = 'NEW_CDR MRV Pathway Uncertainties'
avail_pathways = ['DAC', 'BiCRS','EW','TER_BIO','OCEAN_BIO_no_harvest','OCEAN_BIO_harvest','OAE_echem','OAE_mineral']



# ----------------- Pandera Checks --------------------

def _validate_component_id(df):
    schema = pa.DataFrameSchema(
        columns={
            "component_id":  pa.Column(str),
        },
        checks=pa.Check(lambda df: ~df[["component_id"]].duplicated()),
    )
    return schema.validate(df)

# ----------------- End Pandera Checks --------------------

def get_legend_sheet(gsheet_doc_name: str) -> pd.DataFrame:
    sh = gc.open(gsheet_doc_name)
    sheet = sh.worksheet('Legend')
    data_list = sheet.get_all_values()
    return pd.DataFrame(data_list[1::],columns=data_list[0])

def get_component_sheet(gsheet_doc_name: str) -> pd.DataFrame:
    sh = gc.open(gsheet_doc_name)
    sheet = sh.worksheet('Components')
    data_list = sheet.get_all_values()
    cdf = pd.DataFrame(data_list[2::],columns=data_list[0])[['component_id','component_name','quantification_target','uncertainty_type','responsibility','uncertainty_impact_min','uncertainty_impact_max','description','revisions','notes','direct-air-capture','biomass-carbon-removal-and-storage','enhanced-weathering','terrestrial-biomass-sinking','ocean-alkalinity-enhancement-electrochemical','ocean-alkalinity-enhancement-mineral','ocean-biomass-sinking-harvest','ocean-biomass-sinking-no-harvest','direct-ocean-capture','biochar','alkaline-waste-mineralization']]
    cdf['revisions'] = cdf['revisions'].apply(eval)
    return cdf

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
    return pd.DataFrame(data_list[10::],columns=data_list[9])


def sheet_data_to_metadata(sheet_data: list) -> dict:
    """Assigns sheet metadata"""
    pathway_id = sheet_data[0][1].strip()
    pathway_name = sheet_data[1][1].strip()
    pathway_description = sheet_data[2][1].strip()
    VCL = list(tuple(sheet_data[3][1].replace(" ", "").split(',')))
    equation = sheet_data[4][1].strip()
    version = sheet_data[5][1].strip()

    revisions = eval(sheet_data[6][1])
    contributors = eval(sheet_data[7][1])
    return {'pathway_id':pathway_id,'pathway_name':pathway_name,'pathway_description':pathway_description, 'VCL':VCL, 'equation':equation, 'version':version, 'revisions': revisions, 'contributors': contributors}


def clean_dataframe(df: pd.DataFrame) -> pd.DataFrame:
    """Sanitizes dataframe for web formatting"""

    # removes any unneeded cols
    df = df[['number', 'category', 'component_id', 'name', 'quantification_target', 'uncertainty_type', 'responsibility', 'uncertainty_impact_min', 'uncertainty_impact_max', 'description', 'notes']]

    # replace empty strings with nan
    df = df.replace(r'^\s*$', np.nan, regex=True)

    #removes additional empty rows
    df.dropna(axis=0, how='all', inplace=True)

    # convert to snake_case
    df.columns = df.columns.str.replace(' ','_')

    # splits any multiple comma sep entries into lists. 
    df['uncertainty_type'] = df.uncertainty_type.str.replace(" ","").apply(lambda x: x.split(','))    

    # regex magic for leading/trailing whitespace
    df = df.replace(r"^ +| +$", r"", regex=True)

    return df

def write_legend_to_json(df: pd.DataFrame):
    """writes legend df to .json"""
    ldict = dict(zip(df.key, df.description))
    with open(f'../data/legend.json', 'w') as fp:
        json.dump(ldict, fp, indent=4)

def write_components_to_json(df: pd.DataFrame):
    """writes components df to .json"""
    
    
    df.to_json('../data/components.json', orient='records', indent=4)


def df_to_dict(df: pd.DataFrame, pathway_id: str, pathway_name: str, pathway_description: str, VCL: str, equation: str, version: str, revisions: list, contributors: list) -> dict:
    """Converts DataFrame and metadata into dictionary 

    Parameters
    ----------
    df : pd.DataFrame
        Cleaned Pandas DataFrame
    pathway_id : str
        ID for Pathway
    pathway_name : str
        Name of Pathway
    pathway_description : str
        Description of Pathway
    VCL : str
        VCL
    equation : str
        Equation
    version : str
        Version
    revisions : list
        List of revisions
    contributors : list
        List of contributors 

    Returns
    -------
    template_dict
        Dictionary containing pathway data and metadata
    """
    template_dict = {"pathway_id":pathway_id.strip(),
                    "pathway_name":pathway_name.strip(),
                    "pathway_description":pathway_description,
                    "VCL":VCL,
                    "equation":equation,
                    "version":version,
                    "elements": df.where(df.notnull(), "").to_dict(orient='records'),
                    "revisions": revisions, 
                    "contributors": contributors


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

def process_legend(gsheet_doc_name: str):
    print('Processing Legend sheet..')

    ldf = get_legend_sheet(gsheet_doc_name)
    write_legend_to_json(ldf)

def process_components_sheet(gsheet_doc_name):
    cdf = get_component_sheet(gsheet_doc_name)


    write_components_to_json(cdf)

def write_pathways_to_json(avail_pathways: list):
    template_dict_list = []
    for pathway in avail_pathways:

        print(f'Processing pathway: {pathway}')
        template_dict = process_sheet(gsheet_doc_name, pathway)
        template_dict_list.append(template_dict)

    write_to_json(template_dict_list)


"""Top priority validation tasks in my mind are: 

- [ ]  [both] Data conforms to expected schema ([https://json-schema.org/](https://json-schema.org/))
- [x]  [components] Uniqueness of component ids
- [ ]  [pathway] Double checks VCL calculation based pathway
- [ ]  [components + pathway] Platonic component uncertainty type tags are superset of pathway type tags
- [ ]  [components + pathway] Platonic component uncertainty is a superset of pathway component uncertainty

Second order validation tasks in my mind are: 

- [ ]  Checks for revision note
- [ ]  No components that are not used by pathways
- [ ]  No starred components in pathway equations
- [ ]  If VCL changes for a pathway, validates that new major version is properly created (and writes out to new json)
- [ ]  If other things have changed, validates that new minor version is properly created
- [ ]  For any change compared to previous version, prints out all “connected” text (e.g. prints out all air-sea-gas-exchange text)"""



def validate_components():
    cdf = get_component_sheet(gsheet_doc_name)

    _validate_component_id(cdf)


validate_components()


write_pathways_to_json(avail_pathways)
process_legend(gsheet_doc_name)
process_components_sheet(gsheet_doc_name)


