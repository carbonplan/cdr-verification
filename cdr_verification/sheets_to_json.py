"""Script to convert google sheets CDR-MRV to .json"""

# ------------------ Imports -----------------------
import numpy as np
import json
import pathlib
import pandas as pd # type: ignore
from .common import auth_service, google_doc_id, gsheet_doc_name, avail_pathways, pathways_data_columns, components_non_pathway_cols, get_pathway_col_list
from s3fs import S3FileSystem


service = auth_service()

def get_data_values_by_sheet_name(*, google_doc_id: str, sheet_name: str)-> list:
    return service.spreadsheets().values().get(spreadsheetId=google_doc_id, range=sheet_name).execute().get('values')

def get_legend_sheet(*, google_doc_id: str) -> pd.DataFrame:
    """Retrieves Legend sheet

    :param google_doc_id: id of google doc
    :type google_doc_id: str
    :return: DataFrame of Legend sheet
    :rtype: pd.DataFrame
    """
    data_list = get_data_values_by_sheet_name(google_doc_id = google_doc_id, sheet_name = "Legend")
    return pd.DataFrame(data_list[1::],columns=data_list[0])

def get_component_sheet(*, google_doc_id: str) -> pd.DataFrame:
    """Retrieves Components sheet

    :param google_doc_id: id of google doc
    :type google_doc_id: str
    :return: DataFrame of Components sheet
    :rtype: pd.DataFrame
    """  
    data_list = get_data_values_by_sheet_name(google_doc_id = google_doc_id, sheet_name = "Components")
    cdf = pd.DataFrame(data_list[2::],columns=data_list[0])

    cdf['component_id'] = cdf['component_id'].str.replace('\u2082','2')
    cdf['uncertainty_type'] = cdf.uncertainty_type.str.replace(" ","").apply(lambda x: x.split(','))    
    cdf['revisions'] = cdf['revisions'].apply(eval)

    return cdf






def component_pathway_flatten(df: pd.DataFrame, pathway_col_list: list) -> pd.DataFrame:
    """Flattens pathway components

    :param df: Component DataFrame
    :type df: pd.DataFrame
    :param pathway_col_list: list of pathway columns 
    :type pathway_col_list: list
    :return: Flattened pathway DataFrame
    :rtype: pd.DataFrame
    """
    df['pathways'] = df[pathway_col_list].apply(lambda x: ','.join(x[x!=""].index),axis=1).str.split(',')
    df.drop(pathway_col_list,axis=1,inplace=True)

    return df 

def get_all_sheets_in_doc(gsheet_doc_name: str) -> dict:
    """Returns dict of all worksheets including ID and name

    :param gsheet_doc_name: name of google doc
    :type gsheet_doc_name: str
    :return: dict of all worksheets 
    :rtype: dict
    """
    sheets = service.spreadsheets().get(spreadsheetId=gsheet_doc_name).execute().get('sheets', '')
    sheet_id_name_dict = {i.get("properties", {}).get("title", 0) : i.get("properties", {}).get("sheetId", 0) for i in sheets}
    return sheet_id_name_dict

def sheet_data_to_dataframe(data_list: list) -> pd.DataFrame:
    """To match gsheets CDR-MRV schema, first four rows are dataset metadata"""
    return pd.DataFrame(data_list[10::],columns=data_list[9])[pathways_data_columns].replace('',np.nan).dropna(how='all')

def contributors_df(*, google_doc_id: str)-> pd.DataFrame:
    """Returns contributors dataframe"""
    data_list = get_data_values_by_sheet_name(google_doc_id = google_doc_id, sheet_name='Contributors')
    return pd.DataFrame(data_list[1::],columns=data_list[0])

def sheet_data_to_metadata(sheet_data: list) -> dict:
    """Assigns sheet metadata"""

    pathway_id = sheet_data[0][1].strip() if len(sheet_data[0])>1 else ''
    pathway_name = sheet_data[1][1].strip() if len(sheet_data[1])>1 else ''
    pathway_description = sheet_data[2][1].strip() if len(sheet_data[2])>1 else ''
    VCL = list(tuple(sheet_data[3][1].replace(" ", "").split(','))) if len(sheet_data[3])>1 else ''
    equation = sheet_data[4][1].strip() if len(sheet_data[4])>1 else ''
    version = sheet_data[5][1].strip() if len(sheet_data[5])>1 else ''
    revisions = eval(sheet_data[6][1]) if len(sheet_data[6])>1 else ''


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

    with open(f'data/contributors.json', 'w') as fp:
        json.dump(contributor_list, fp, indent=4)



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
    


def write_to_json(template_dict: dict, pathway: str, pathway_version: str):
    """Writes cleaned list of pathway dictionaries and metadata to .json.

    Parameters
    ----------
    template_dict : dict
    pathway : pathway name
    """
    # sample_file = pathlib.Path("data") / f"{pathway}/{pathway_version}.json"
    s3_path = 's3://carbonplan-scratch/cdr-test.json'

    s3 = S3FileSystem()
    with s3.open(s3_path, 'w') as file:
        json.dump(template_dict, file)

    # # sample_file.parent.mkdir(exist_ok=True)
    # with sample_file.open("w", encoding="utf-8") as f:
    #     json.dump(template_dict, f, indent=4)

def process_sheet(gsheet_doc_name: str, worksheet_name: str):
    data_list = get_data_values_by_sheet_name(google_doc_id = google_doc_id, sheet_name = worksheet_name)
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
    pathway_col_list = get_pathway_col_list(cdf)
    cdf = component_pathway_flatten(cdf, pathway_col_list)
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


if __name__ == '__main__':
    write_pathways_to_json(avail_pathways)
    process_legend(gsheet_doc_name)
    process_components_sheet(gsheet_doc_name)
    process_contributors_sheet(gsheet_doc_name)
