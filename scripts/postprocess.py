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
import json
import re 
import os 
import requests
import pathlib
import pandas as pd # type: ignore
from oauth2client.service_account import ServiceAccountCredentials # type: ignore
from ast import literal_eval

from auth import gc

from sheets_to_json import get_component_sheet, gsheet_doc_name, avail_pathways, gsheet_to_data_list, sheet_data_to_dataframe, sheet_data_to_metadata, contributors_df, get_pathway_col_list
from auth import credentials, gc


# ------------------ Auth -----------------------


# Load component sheet
cdf = get_component_sheet(gsheet_doc_name)
# Load contributors sheet
cont_df = contributors_df()
# Retrieve list of pathway columns
pathway_col_list = get_pathway_col_list(cdf)

# A dict to map uncertainty values to numeric 
def uncertainty_map():
    return {'negligible': 0,
               'low':1,
               'medium':2,
               'high':3,
               'very high': 4,
               'not characterized':5}

um = uncertainty_map()



def send_slack_notification(df: pd.DataFrame, validation_name: str):
    """Send slack notifications to the cdr-verification-updates slack channel

    :param df: Input DataFrame of reported inconsistencies 
    :type df: pd.DataFrame
    :param validation_name: A description of the validation check
    :type validation_name: str
    """
    dataframe_markdown = df.to_markdown()
    slack_webhook_url = os.environ.get("SLACK_WEBHOOK_URL")
    validation_description = pd.DataFrame({'Validation': [validation_name]}).to_markdown(index=False)
    r = requests.post(slack_webhook_url, json={'text': f'```{validation_description}``` ```{dataframe_markdown}``` \n \n'})

    r.raise_for_status()


# --------------------------------------------------
# ----------------- Pathways Sheets ----------------
# --------------------------------------------------


def generate_combined_pathway_data_dict(gsheet_doc_name: str, avail_pathways: list)-> dict:
    """Function to create a object containing pairs of pathway sheet metadata and data

    :param gsheet_doc_name: name of the google doc
    :type gsheet_doc_name: str
    :param avail_pathways: list of available pathways
    :type avail_pathways: list
    :return: dict containing pathway metadata and data
    :rtype: dict
    """
    metadata_df_dict = {}
    metadata_dict_combined = {}
    for pathway in avail_pathways:
        data_list = gsheet_to_data_list(gsheet_doc_name, pathway)

        df = sheet_data_to_dataframe(data_list)
        metadata_dict = sheet_data_to_metadata(data_list)

        metadata_df_dict[pathway] = df 
        metadata_dict_combined[pathway] = metadata_dict

    return {'metadata_dict_combined':metadata_dict_combined,'metadata_df_dict': metadata_df_dict}

metadata_combined = generate_combined_pathway_data_dict(gsheet_doc_name, avail_pathways)

# --------------------------------------------------------------------------------------
# [ x ]  (Static - Postprocess) All equation numbers correspond with numbered components 
# --------------------------------------------------------------------------------------
def equation_number_component_number():
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
    if not df.empty:
        send_slack_notification(df, 'All equation numbers correspond with numbered components')


# - [ x ]  (Static - Postprocess) There is a version note corresponding with the current version number
# Takes the latest revision, checks if 'note' is empty. If empty, version_note_bool == False

def pathways_version_note_bool():
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
    if not df.empty:
        send_slack_notification(df, 'There is a version note corresponding with the current version number')



# --------------------------------------------------------------------------------------------------------------------------
# - [ x ]  (Static - Postprocess) All components appearing in pathway sheets appear in the component sheet.
# --------------------------------------------------------------------------------------------------------------------------
def pathway_componets_sheets_subset() -> bool:
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

    df = pd.DataFrame({'pathway':pathway_name_list, 'component_id_bool':pathway_component_id_bool_list, 'invalid_component_ids': pathway_invalid_componet_id_list})
    
    if not df.empty:
        send_slack_notification(df, 'All components appearing in pathway sheets appear in the component sheet')

        
# --------------------------------------------------------------------------------------------------------------------------
# - [ x ]  (Static - Postprocess) All pathway ids in pathway sheets are reflected as a column in the component sheet 
# --------------------------------------------------------------------------------------------------------------------------
def pathway_id_sheets_subset():
    """All pathway ids in pathway sheets are reflected as a column in the component sheet """
    pathway_name_list = []
    pathway_id_bool_list = []

    for pathway in metadata_combined['metadata_dict_combined']:
        pathway_id = metadata_combined['metadata_dict_combined'][pathway]['pathway_id']
        pathway_id_subset_bool = set([pathway_id]).issubset(set(pathway_col_list))
        if not pathway_id_subset_bool:
            pathway_name_list.append(pathway)
            pathway_id_bool_list.append(pathway_id_subset_bool)  

    df = pd.DataFrame({'pathway':pathway_name_list, 'pathway_id_is_subset_component_id':pathway_id_bool_list})

    if not df.empty:
        send_slack_notification(df, 'All pathway ids in pathway sheets are reflected as a column in the component sheet')

        
# --------------------------------------------------------------------------------------------------------------------------
# - [ x ]  (Static - Postprocess) All pathway ids in contributor sheet are reflected in the component sheet 
# --------------------------------------------------------------------------------------------------------------------------
def contributor_pathway_subset_bool() -> bool:
    """All pathway ids in contributor sheet are reflected in the component sheet """

    # Removes 'type', 'name', 'affiliation', 'initial', 'notes' from column names
    cont_df_pathway_ids = set(list(cont_df)) - set(['type', 'name', 'affiliation', 'initial', 'notes'])
    contrib_df_missing_pathways  = list(set(pathway_col_list) - cont_df_pathway_ids)
    contributor_non_missing_pathway_bool = cont_df_pathway_ids.issubset(set(pathway_col_list))


    df = pd.DataFrame({'contributor_pathways_not_missing':[contributor_non_missing_pathway_bool], 'contrib_df_missing_pathways':[contrib_df_missing_pathways]})
    if not df['contributor_pathways_not_missing'].any(): # ie if any bools are False
        send_slack_notification(df, 'All pathway ids in contributor sheet are reflected in the component sheet')

    

# -----------------------------------------------------------------------------------------------------------------------------
# - [ x ]  (Static - Postprocess) All pathway versions in contributor sheets correspond with pathway versions in pathway sheets 
# -----------------------------------------------------------------------------------------------------------------------------

def latest_pathway_version_match():
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

    if not df.empty:
        send_slack_notification(df, 'All pathway versions in contributor sheets correspond with pathway versions in pathway sheets')


# ------------------------------------------------------------------------------------------------------------------------
# - [ x ]  (Static - Postprocess) Any component uncertainty range in pathway sheet is a subset of range in component sheet
# ------------------------------------------------------------------------------------------------------------------------

def pathway_uncertainty_range():
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

    if not df.empty:
        send_slack_notification(df, 'Any component uncertainty range in pathway sheet is a subset of range in component sheet')



equation_number_component_number()
pathways_version_note_bool()
pathway_componets_sheets_subset()
pathway_id_sheets_subset()
contributor_pathway_subset_bool()
latest_pathway_version_match()
pathway_uncertainty_range()


