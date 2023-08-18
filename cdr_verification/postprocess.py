# ---------------------------------------------------------
#      This script is intended as a `postprocess`         #
#      check to validate sections of the CDR-MRV sheets   # 
#      that are not covered by google-sheets validation   #
# ---------------------------------------------------------


## Pathways Sheets
# - [ ? ]  (Static - Postprocess) VCL range matches component uncertainty count 
# - [ x ]  (Static - Postprocess) There is a version note corresponding with the current version number
# - [ x ]  (Static - Postprocess) All equation numbers correspond with numbered components (ie all numbers in equation are a subset of the numbers found in the number column)


### Cross-check (Pathway / Component)

# - [ x ]  (Static - Postprocess) All components appearing in pathway sheets appear in the component sheet.
# - [ x ]  (Static - Postprocess) Any component uncertainty range in pathway sheet is a subset of range in component sheet (see e.g. `nsad` and terrestrial versus ocean biomass sinking) - ( python on version release)
# - [ x ]  (Static - Postprocess) All pathway ids in pathway sheets are reflected as a column in the component sheet 
# - [ x ]  (Static - Postprocess) All pathway ids in contributor sheet are reflected in the component sheet -
# - [ x ]  (Static - Postprocess) All pathway versions in contributor sheets correspond with pathway versions in pathway sheets 


# ------------------ Imports -----------------------
import numpy as np
import re 
import os 
import requests
import pandas as pd # type: ignore

from .sheets_to_json import get_component_sheet, gsheet_doc_name, get_data_values_by_sheet_name, sheet_data_to_dataframe, sheet_data_to_metadata, contributors_df, get_pathway_col_list
from .common import send_slack_notification, google_doc_id, avail_pathways

# ------------------ Auth -----------------------




# A dict to map uncertainty values to numeric 
def uncertainty_map():
    return {'negligible': 0,
               'low':1,
               'medium':2,
               'high':3,
               'very high': 4,
               'not characterized':5}

um = uncertainty_map()






# --------------------------------------------------
# ----------------- Pathways Sheets ----------------
# --------------------------------------------------

def generate_combined_pathway_data_dict(*, google_doc_id: str, avail_pathways: list)-> dict:
    """Function to create a object containing pairs of pathway sheet metadata and data

    :param google_doc_id: id
      of the google doc
    :type google_doc_id: str
    :param avail_pathways: list of available pathways
    :type avail_pathways: list
    :return: dict containing pathway metadata and data
    :rtype: dict
    """
    metadata_df_dict = {}
    metadata_dict_combined = {}
    for pathway in avail_pathways:
        data_list = get_data_values_by_sheet_name(google_doc_id = google_doc_id,sheet_name=pathway)

        df = sheet_data_to_dataframe(data_list)
        metadata_dict = sheet_data_to_metadata(data_list)

        metadata_df_dict[pathway] = df 
        metadata_dict_combined[pathway] = metadata_dict

    return {'metadata_dict_combined':metadata_dict_combined,'metadata_df_dict': metadata_df_dict}


# --------------------------------------------------------------------------------------
# [ x ]  (Static - Postprocess) All equation numbers correspond with numbered components 
# --------------------------------------------------------------------------------------
def equation_number_component_number(*,metadata_combined: dict, notification: bool = True) -> pd.DataFrame:
    """All equation numbers correspond with numbered components """
    pathway_name_list = []
    equation_number_bool_list = []
    pathway_diff_nums_list = []
    for pathway in metadata_combined['metadata_df_dict']:

        digits_in_equation =set([int(val) for val in re.findall('\d+',metadata_combined['metadata_dict_combined'][pathway]['equation']) if val.isdigit()])
        digits_in_num_col = set(metadata_combined['metadata_df_dict'][pathway]['number'].str.strip('*').astype(int))

        diff_nums_equation_num_col  = list(digits_in_equation - digits_in_num_col)

        numbered_components_is_subset_bool = set(digits_in_equation).issubset(digits_in_num_col) # If evals to True, then the digits in the equation are a subset of number
        if not numbered_components_is_subset_bool:
            pathway_name_list.append(pathway)
            equation_number_bool_list.append(numbered_components_is_subset_bool)
            pathway_diff_nums_list.append(diff_nums_equation_num_col)

    df = pd.DataFrame({'pathway_name':pathway_name_list, 'equation_number_bool': equation_number_bool_list, 'invalid_numbers_in_equation': pathway_diff_nums_list})
    if not df.empty and notification:
        send_slack_notification(df, 'All equation numbers correspond with numbered components')
    return df 

# - [ x ]  (Static - Postprocess) There is a version note corresponding with the current version number
# Takes the latest revision, checks if 'note' is empty. If empty, version_note_bool == False

def pathways_version_note_bool(*,metadata_combined: dict, notification: bool = True) -> pd.DataFrame:
    """There is a version note corresponding with the current version number
      - Takes the latest revision, checks if 'note' is empty. If empty, version_note_bool == False"""
    
    pathway_name_list = []
    version_bool_list = []
    
    for pathway in metadata_combined['metadata_df_dict']:
        version_note = metadata_combined['metadata_dict_combined'][pathway]['revisions'][-1]['note'].strip()
        version_note_bool = bool(version_note)
        if not version_note_bool:
            pathway_name_list.append(pathway)
            version_bool_list.append(version_note_bool)

    df = pd.DataFrame({'pathway_name':pathway_name_list, 'latest_version_note_exists': version_bool_list})
    if not df.empty and notification:
        send_slack_notification(df, 'There is a version note corresponding with the current version number')
    return df 



# --------------------------------------------------------------------------------------------------------------------------
# - [ x ]  (Static - Postprocess) All components appearing in pathway sheets appear in the component sheet.
# --------------------------------------------------------------------------------------------------------------------------
def pathway_componets_sheets_subset(*, metadata_combined: dict, cdf: pd.DataFrame, notification: bool = True) -> pd.DataFrame:
    """All components appearing in pathway sheets appear in the component sheet."""
    unique_component_ids = set(cdf['component_id'])

    pathway_name_list = []
    pathway_component_id_bool_list = []
    pathway_invalid_componet_id_list = []

    for pathway in metadata_combined['metadata_df_dict']:
        pathway_component_ids = set(metadata_combined['metadata_df_dict'][pathway]['component_id'].to_list())
        component_ids_in_pathway_not_in_component_sheet  = list(pathway_component_ids - unique_component_ids)
        pathway_component_bool = pathway_component_ids.issubset(unique_component_ids)
        if not pathway_component_bool:
            pathway_name_list.append(pathway)
            pathway_component_id_bool_list.append(pathway_component_bool)
            pathway_invalid_componet_id_list.append(component_ids_in_pathway_not_in_component_sheet)
        break
    df = pd.DataFrame({'pathway':pathway_name_list, 'component_id_bool':pathway_component_id_bool_list, 'invalid_component_ids': pathway_invalid_componet_id_list})
    
    if not df.empty and notification:
        send_slack_notification(df, 'All components appearing in pathway sheets appear in the component sheet')
    return df 


# --------------------------------------------------------------------------------------------------------------------------
# - [ x ]  (Static - Postprocess) All pathway ids in pathway sheets are reflected as a column in the component sheet 
# --------------------------------------------------------------------------------------------------------------------------
def pathway_id_sheets_subset(*, metadata_combined: dict, cdf: pd.DataFrame, pathway_col_list: list, notification: bool = True) -> pd.DataFrame:
    """All pathway ids in pathway sheets are reflected as a column in the component sheet """
    pathway_name_list = []
    pathway_id_bool_list = []
    invalid_pathway_id_list = []
    for pathway in metadata_combined['metadata_dict_combined']:

        pathway_id = metadata_combined['metadata_dict_combined'][pathway]['pathway_id']
        pathway_id_subset_bool = set([pathway_id]).issubset(set(pathway_col_list))
        if not pathway_id_subset_bool:
            pathway_name_list.append(pathway)
            pathway_id_bool_list.append(pathway_id_subset_bool)  
            invalid_pathway_id_list.append(pathway_id)

    df = pd.DataFrame({'pathway':pathway_name_list, 'pathway_id_is_subset_component_id':pathway_id_bool_list, 'invalid_pathway_id': invalid_pathway_id_list})

    if not df.empty :
        send_slack_notification(df, 'All pathway ids in pathway sheets are reflected as a column in the component sheet')
    return df 

        
# --------------------------------------------------------------------------------------------------------------------------
# - [ x ]  (Static - Postprocess) All pathway ids in contributor sheet are reflected in the component sheet 
# --------------------------------------------------------------------------------------------------------------------------
def contributor_pathway_subset_bool(*, cdf: pd.DataFrame, cont_df: pd.DataFrame, pathway_col_list: list, notification: bool = True) -> pd.DataFrame:
    """All pathway ids in contributor sheet are reflected in the component sheet """
    
    # Removes 'type', 'name', 'affiliation', 'initial', 'notes' from column names
    cont_df_pathway_ids = set(list(cont_df)) - set(['type', 'name', 'affiliation', 'initial', 'notes'])
    cdf_pathways_not_in_cont_df  = list(set(pathway_col_list) - cont_df_pathway_ids)
    cont_df_pathways_not_in_cdf  = list(cont_df_pathway_ids - set(pathway_col_list))

    df = pd.DataFrame({'pathway_ids_only_in_components_sheet':[cdf_pathways_not_in_cont_df], 'pathway_ids_only_in_contributors_sheet':[cont_df_pathways_not_in_cdf]})
    if not df.empty: # ie if df is not empty
        send_slack_notification(df, 'All pathway ids in contributor sheet are reflected in the component sheet')
    return df 

    

# -----------------------------------------------------------------------------------------------------------------------------
# - [ x ]  (Static - Postprocess) All pathway versions in contributor sheets correspond with pathway versions in pathway sheets 
# -----------------------------------------------------------------------------------------------------------------------------

def latest_pathway_version_match(*, metadata_combined: dict, cont_df: pd.DataFrame, notification: bool = True) -> pd.DataFrame:
    """All pathway versions in contributor sheets correspond with pathway versions in pathway sheets """

    pathway_name_list = []
    pathway_version_match_bool_list = []
    latest_pathway_version_contributor_df_list = []
    pathway_sheet_version_list = []

    for pathway_key in metadata_combined['metadata_dict_combined']:
        
        pathway = metadata_combined['metadata_dict_combined'][pathway_key]['pathway_id']

        contrib_df_pathway_latest_version = max(cont_df[pathway][~cont_df[pathway].replace('',np.nan).isnull()].str.split(',').explode().astype(float).to_list())
        pathway_version = float(metadata_combined['metadata_dict_combined'][pathway_key]['version'])
        pathway_version_match_bool = pathway_version == contrib_df_pathway_latest_version
        if not pathway_version_match_bool:
            pathway_name_list.append(pathway)
            pathway_version_match_bool_list.append(pathway_version_match_bool)
            latest_pathway_version_contributor_df_list.append(contrib_df_pathway_latest_version)
            pathway_sheet_version_list.append(pathway_version)

    df = pd.DataFrame({'pathway':pathway_name_list, 'pathway_version_match_bool':pathway_version_match_bool_list, 'latest_pathway_version_contributor': latest_pathway_version_contributor_df_list, 'pathway_sheet_version':pathway_sheet_version_list})

    if not df.empty and notification:
        send_slack_notification(df, 'All pathway versions in contributor sheets correspond with pathway versions in pathway sheets')
    return df 


# ------------------------------------------------------------------------------------------------------------------------
# - [ x ]  (Static - Postprocess) Any component uncertainty range in pathway sheet is a subset of range in component sheet
# ------------------------------------------------------------------------------------------------------------------------

def pathway_uncertainty_range(*, metadata_combined: dict, cdf: pd.DataFrame, notification: bool = True) -> pd.DataFrame:
    """Any component uncertainty range in pathway sheet is a subset of range in component sheet (see e.g. `nsad` and terrestrial versus ocean biomass sinking) - ( python on version release)
    - Each component in components sheet has a range defined by two columns ([uncertainty_impact_min, uncertainty_impact_max]).
    - These can be either: low medium high negligible very high. So we need to map these two ints, then for each pathway, for each component id, we need to map to ints, then map to the SOT (component sheet)
    """
    df_append = []

    for pathway in metadata_combined['metadata_df_dict']:

        pdf = metadata_combined['metadata_df_dict'][pathway]
        path_sub = pdf[['component_id','uncertainty_impact_min', 'uncertainty_impact_max']]
        com_sub = cdf[['component_id','uncertainty_impact_min', 'uncertainty_impact_max']]


        path_sub['uncertainty_impact_min_map'] = path_sub['uncertainty_impact_min'].map(um)
        path_sub['uncertainty_impact_max_map'] = path_sub['uncertainty_impact_max'].map(um)

        com_sub['uncertainty_impact_min_map'] = com_sub['uncertainty_impact_min'].map(um)
        com_sub['uncertainty_impact_max_map'] = com_sub['uncertainty_impact_max'].map(um)

        join_df = path_sub.merge(com_sub, on='component_id', how='left', suffixes=['_pathway_sheet','_component_sheet'])

        join_df['uncertainty_impact_min_bool']  = join_df['uncertainty_impact_min_map_pathway_sheet'] >= join_df['uncertainty_impact_min_map_component_sheet']
        join_df['uncertainty_impact_max_bool']  = join_df['uncertainty_impact_max_map_pathway_sheet'] <= join_df['uncertainty_impact_max_map_component_sheet']


        uncertainty_mismatch_df = join_df[~join_df[['uncertainty_impact_min_bool','uncertainty_impact_max_bool']].all(axis = 1)]
        uncertainty_mismatch_df['pathway'] = pathway
        uncertainty_mismatch_df = uncertainty_mismatch_df[['pathway', 'uncertainty_impact_min_pathway_sheet', 'uncertainty_impact_max_pathway_sheet', 'uncertainty_impact_min_component_sheet', 'uncertainty_impact_max_component_sheet']]
        df_append.append(uncertainty_mismatch_df)

    df = pd.concat(df_append) 

    if not df.empty and notification:
        send_slack_notification(df, 'Any component uncertainty range in pathway sheet is a subset of range in component sheet')
    return df 




if __name__ == '__main__':
    # google_doc_id = '1MFM3hs1lB50YkgbPJYBMcvYMRJ6v8VhOOKCUDwsfjiw'
    metadata_combined = generate_combined_pathway_data_dict(google_doc_id=google_doc_id, avail_pathways=avail_pathways)
    # Load component,contributors and pathway columns
    cdf = get_component_sheet(google_doc_id=google_doc_id)
    cont_df = contributors_df(google_doc_id=google_doc_id)
    pathway_col_list = get_pathway_col_list(cdf)

    equation_number_component_number(metadata_combined=metadata_combined)
    pathways_version_note_bool(metadata_combined=metadata_combined)
    pathway_componets_sheets_subset(metadata_combined=metadata_combined, cdf=cdf)
    pathway_id_sheets_subset(metadata_combined=metadata_combined)
    contributor_pathway_subset_bool(cdf=cdf, cont_df=cont_df, pathway_col_list = pathway_col_list)
    latest_pathway_version_match(metadata_combined=metadata_combined)
    pathway_uncertainty_range(metadata_combined=metadata_combined)


