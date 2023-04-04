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
avail_pathways = ['DAC', 'BiCRS','EW','TER_BIO','OCEAN_BIO_no_harvest','OCEAN_BIO_harvest','OAE_echem','OAE_mineral', 'DOR','BIOCHAR','ALK_WASTE_MIN']



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
    pathway_col_list = ['direct-air-capture','biomass-carbon-removal-and-storage','enhanced-weathering','terrestrial-biomass-sinking','ocean-alkalinity-enhancement-electrochemical','ocean-alkalinity-enhancement-mineral','ocean-biomass-sinking-harvest','ocean-biomass-sinking-no-harvest','direct-ocean-removal','biochar','alkaline-waste-mineralization']
    cdf = pd.DataFrame(data_list[2::],columns=data_list[0])[['component_id','component_name','quantification_target','uncertainty_type','responsibility','uncertainty_impact_min','uncertainty_impact_max','category', 'description','revisions','notes']+ pathway_col_list]
    cdf['component_id'] = cdf['component_id'].str.replace('\u2082','2')
    cdf['uncertainty_type'] = cdf.uncertainty_type.str.replace(" ","").apply(lambda x: x.split(','))    

    cdf['pathways'] = cdf[pathway_col_list].apply(lambda x: ','.join(x[x!=""].index),axis=1).str.split(',')
    cdf.drop(pathway_col_list,axis=1,inplace=True)

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

def contributors_df():
    data_list = gsheet_to_data_list(gsheet_doc_name, 'Contributors')
    return pd.DataFrame(data_list[1::],columns=data_list[0])


def sheet_data_to_metadata(sheet_data: list) -> dict:
    """Assigns sheet metadata"""
    pathway_id = sheet_data[0][1].strip()
    pathway_name = sheet_data[1][1].strip()
    pathway_description = sheet_data[2][1].strip()
    VCL = list(tuple(sheet_data[3][1].replace(" ", "").split(',')))
    equation = sheet_data[4][1].strip()
    version = sheet_data[5][1].strip()
    revisions = eval(sheet_data[6][1])


    return {'pathway_id':pathway_id,'pathway_name':pathway_name,'pathway_description':pathway_description, 'VCL':VCL, 'equation':equation, 'version':version, 'revisions': revisions}


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
    with open(f'data/legend.json', 'w') as fp:
        json.dump(ldict, fp, indent=4)

def contributors_to_json(df: pd.DataFrame):
    """Processes and writes contributors to combined json"""
    contributor_list = []
    for _, subset in df.iterrows():
        dropped =  subset.dropna()
        sinfo = subset.loc[['type','name','affiliation','initial','notes']].dropna()
        spathway = dropped.drop(['type','name','affiliation','initial','notes'],errors='ignore')
        spathway.replace("",np.nan,inplace=True)
        spathway.dropna(inplace=True)
        pathway_list = []
        for i, v in spathway.items():
            pathway_list.append({'id': i, 'version': v.split(',')})
        sinfo['pathways'] = pathway_list
        contributor_list.append(sinfo.to_dict())

    contributor_combined_dict = {"contributors": contributor_list}
    with open(f'data/contributors.json', 'w') as fp:
        json.dump(contributor_combined_dict, fp, indent=4)



def write_components_to_json(df: pd.DataFrame):
    """writes components df to .json"""
    
    df.to_json('data/components.json', orient='records', indent=4)


def df_to_dict(df: pd.DataFrame, pathway_id: str, pathway_name: str, pathway_description: str, VCL: str, equation: str, version: str, revisions: list) -> dict:
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
                    "components": df.where(df.notnull(), "").to_dict(orient='records')


                    }
    return template_dict
    

def write_metadata_to_json(*, pathway: str, metadata_dict: dict, contributor_df: pd.DataFrame):
    """Write metadata revisions for each pathway

    :param pathway: name of pathway
    :type pathway: str
    :param metadata_dict: metadata dict to be subset
    :type metadata_dict: dict
    """

    # Create dictionary/df of contributor sheet. For each pathway in this function, 
    # subset that dataframe to only the rows of relevent contributors, 
    # select columns and transform to dict. 
    # If empty, create array
    # Combine with revisons dict and write to json

    # Create filepath for each pathway metadata file
    sample_file = pathlib.Path("data") / f"{pathway}/metadata.json"
    sample_file.parent.mkdir(exist_ok=True)


    pathway_id = metadata_dict['pathway_id']
    # switch empty strs to nans for sel 
    contributor_df.replace("",np.nan,inplace=True)

    # grab contibutors matching pathway
    contributor_df_subset = contributor_df[~contributor_df[pathway_id].isnull()][['type', 'name', 'affiliation', 'notes', pathway_id]]
    
    # switch back to empty strs for dict
    contributor_df_subset.replace(np.nan,"",inplace=True)

    # update pathway_id column to 'version'
    contributor_df_subset.rename({pathway_id:'version'},inplace=True,axis=1)

    # convert version to list
    contributor_df_subset['version'] = contributor_df_subset['version'].str.replace(" ","").apply(lambda x: x.split(','))    

    # If all values in contributors are empty, save as empty list
    if contributor_df_subset.empty:
        contributor_dict = []

    contributor_dict = contributor_df_subset.to_dict(orient='records')

    revisions_dict = metadata_dict['revisions']


    combined_dict = {}
    combined_dict['contributors'] = contributor_dict
    combined_dict['revisions'] = revisions_dict

    with sample_file.open("w", encoding="utf-8") as fp:
        json.dump(combined_dict, fp, indent=4)
    
    with contributor_file.open("w+") as fp:
        json.dump(contributor_dict, fp, indent=4)


def write_to_json(template_dict: list, pathway: str, pathway_version: str):
    """Writes cleaned list of pathway dictionaries and metadata to .json.

    Parameters
    ----------
    template_dict : dict
    pathway : pathway name
    """
    sample_file = pathlib.Path("data") / f"{pathway}/{pathway_version}.json"
    sample_file.parent.mkdir(exist_ok=True)
    with sample_file.open("w", encoding="utf-8") as f:
        json.dump(template_dict, f, indent=4)



def process_sheet(gsheet_doc_name: str, worksheet_name: str):
    data_list = gsheet_to_data_list(gsheet_doc_name, worksheet_name)
    df = sheet_data_to_dataframe(data_list)
    metadata_dict = sheet_data_to_metadata(data_list)
    cdf = clean_dataframe(df)
    return {'cdf':cdf, 'metadata_dict':metadata_dict}

def process_legend(gsheet_doc_name: str):
    print('Processing Legend sheet..')

    ldf = get_legend_sheet(gsheet_doc_name)
    write_legend_to_json(ldf)

def process_components_sheet(gsheet_doc_name):
    print('Processing Components sheet..')
    cdf = get_component_sheet(gsheet_doc_name)
    write_components_to_json(cdf)

def process_contributors_sheet(gsheet_doc_name):
    contributor_df = contributors_df()
    contributors_to_json(contributor_df)

def write_pathways_to_json(avail_pathways: list):
    contributor_df = contributors_df()
    for pathway in avail_pathways:

        print(f'Processing pathway: {pathway}')
        process_sheet_dict = process_sheet(gsheet_doc_name, pathway)
        template_dict = df_to_dict(process_sheet_dict['cdf'],  **process_sheet_dict['metadata_dict'])
        write_to_json(template_dict, pathway, process_sheet_dict['metadata_dict']['version'])
        write_metadata_to_json(pathway = pathway, metadata_dict = process_sheet_dict['metadata_dict'], contributor_df=contributor_df)


def validate_components():
    cdf = get_component_sheet(gsheet_doc_name)

    _validate_component_id(cdf)


validate_components()
write_pathways_to_json(avail_pathways)
process_legend(gsheet_doc_name)
process_components_sheet(gsheet_doc_name)
process_contributors_sheet(gsheet_doc_name)
