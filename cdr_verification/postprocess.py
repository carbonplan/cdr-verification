# ---------------------------------------------------------
#      This script is intended as a `postprocess`         #
#      check to validate sections of the CDR-MRV sheets   #
#      that are not covered by google-sheets validation   #
# ---------------------------------------------------------

## Components Sheet

# - [ x ]  (Static) Check component id is unique
# - [ x ] (Static) Each component has:
#     - [ x ]  A non-empty component name
#     - [ x ]  A non-empty quantification target
#     - [ x ]  A non-empty description
#     - [ x ]  An uncertainty type (execution, scientific, counterfactual)
#     - [ x ]  A responsibility (project, system)
#     - [ x ]  An uncertainty min  ('not characterized','negligible', 'low', 'medium', 'high', 'very high’) - (google-sheets-api)
#     - [ x ]  An uncertainty  max ('not characterized','negligible', 'low', 'medium', 'high', 'very high’)
#     - [ x ]  At least one pathway column filled in

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
import re

import numpy as np
import pandas as pd  # type: ignore

from .common import (
    avail_pathways,
    get_pathway_col_list,
    google_doc_id,
    responsibility_values,
    send_slack_notification,
    uncertainty_values,
)
from .sheets_to_json import (
    contributors_df,
    get_component_sheet,
    get_data_values_by_sheet_name,
    sheet_data_to_dataframe,
    sheet_data_to_metadata,
)

# ------------------ Auth -----------------------


# A dict to map uncertainty values to numeric
def uncertainty_map():
    return {
        'negligible': 0,
        'low': 1,
        'medium': 2,
        'high': 3,
        'very high': 4,
        'not characterized': 5,
    }


um = uncertainty_map()


# --------------------------------------------------
# ---------------- Components Sheets ---------------
# --------------------------------------------------


# --------------------------------------------------------------------------------------
# [ x ]  (Static - Components) Check component id is unique
# --------------------------------------------------------------------------------------
def unique_component_id(*, cdf: pd.DataFrame, notification: bool = True) -> pd.DataFrame:
    duplicated_ids = list(set(cdf['component_id'][cdf['component_id'].duplicated()]))
    df = pd.DataFrame({'duplicated_component_ids': duplicated_ids})
    if not df.empty and notification:
        send_slack_notification(df, 'Check component id is unique')
    return df


# --------------------------------------------------------------------------------------
# [ x ]  (Static - Components) Each component has a non-empty component name
# --------------------------------------------------------------------------------------
def non_empty_component_name(*, cdf: pd.DataFrame, notification: bool = True) -> pd.DataFrame:
    empty_component_name = cdf['component_id'][cdf['component_name'].replace('', np.nan).isnull()]
    df = pd.DataFrame({'component_ids_with_missing_component_names': empty_component_name})
    if not df.empty and notification:
        send_slack_notification(df, 'Each component has a non-empty component name')
    return df


# --------------------------------------------------------------------------------------
# [ x ]  (Static - Components) Each component has a non-empty quantification target
# --------------------------------------------------------------------------------------
def non_empty_quantification_target(
    *, cdf: pd.DataFrame, notification: bool = True
) -> pd.DataFrame:
    empty_quantification_target = cdf['component_id'][
        cdf['quantification_target'].replace('', np.nan).isnull()
    ]
    df = pd.DataFrame(
        {'component_ids_with_missing_quantification_target': empty_quantification_target}
    )
    if not df.empty and notification:
        send_slack_notification(df, 'Each component has a non-empty quantification target')
    return df


# --------------------------------------------------------------------------------------
# [ x ]  (Static - Components) Each component has a non-empty description
# --------------------------------------------------------------------------------------
def non_empty_description(*, cdf: pd.DataFrame, notification: bool = True) -> pd.DataFrame:
    empty_description = cdf['component_id'][cdf['description'].replace('', np.nan).isnull()]
    df = pd.DataFrame({'component_ids_missing_description': empty_description})
    if not df.empty and notification:
        send_slack_notification(df, 'Each component has a non-empty description')
    return df


# -----------------------------------------------------------------------------------------------------------
# [ x ]  (Static - Components) Each component has an uncertainty type (execution, scientific, counterfactual)
# -----------------------------------------------------------------------------------------------------------
def valid_uncertainty_type(*, cdf: pd.DataFrame, notification: bool = True) -> pd.DataFrame:
    valid_uncertainties = ['execution', 'scientific', 'counterfactual']
    row_component_id = []
    row_invalid_uncertainty_list = []
    for index, row in cdf[['component_id', 'uncertainty_type']].iterrows():
        for unc_type in row['uncertainty_type']:
            invalid_uncertainty_list = []
            if unc_type not in valid_uncertainties:
                invalid_uncertainty_list.append(unc_type)
        if len(invalid_uncertainty_list) != 0:
            row_component_id.append(row['component_id'])
            row_invalid_uncertainty_list.append(invalid_uncertainty_list)

    df = pd.DataFrame(
        {
            'component_ids_with_invalid_uncertainty_type': row_component_id,
            'invalid_uncertainty_type': row_invalid_uncertainty_list,
        }
    )
    if not df.empty and notification:
        send_slack_notification(
            df, 'Each component has an uncertainty type (execution, scientific, counterfactual)'
        )

    return df


# ------------------------------------------------------------------------------------------------------
# [ x ]  (Static - Components) Each component has an uncertainty type A responsibility (project, system)
# -------------------------------------------------------------------------------------------------------
def valid_responsibility(*, cdf: pd.DataFrame, notification: bool = True) -> pd.DataFrame:
    df = cdf[['component_id', 'responsibility']][~cdf['responsibility'].isin(responsibility_values)]
    df = df.rename(
        columns={
            'component_id': 'component_ids_with_invalid_responsibility',
            'responsibility': 'invalid_responsibility',
        }
    )
    if not df.empty and notification:
        send_slack_notification(
            df, 'Each component has an uncertainty type (execution, scientific, counterfactual)'
        )
    return df


# ------------------------------------------------------------------------------------------------------
# [ x ]  (Static - Components) Each component has an uncertainty type an uncertainty min
# -------------------------------------------------------------------------------------------------------
def valid_uncertainty_min(*, cdf: pd.DataFrame, notification: bool = True) -> pd.DataFrame:
    df = cdf[['component_id', 'uncertainty_impact_min']][
        ~cdf['uncertainty_impact_min'].isin(uncertainty_values)
    ]
    df = df.rename(
        columns={
            'component_id': 'component_ids_with_invalid_uncertainty_min',
            'uncertainty_impact_min': 'invalid_uncertainty_min',
        }
    )
    if not df.empty and notification:
        send_slack_notification(
            df,
            "An uncertainty min  ('not characterized','negligible', 'low', 'medium', 'high', 'very high'",
        )
    return df


# ------------------------------------------------------------------------------------------------------
# [ x ]  (Static - Components) Each component has an uncertainty type an uncertainty max
# -------------------------------------------------------------------------------------------------------
def valid_uncertainty_max(*, cdf: pd.DataFrame, notification: bool = True) -> pd.DataFrame:
    df = cdf[['component_id', 'uncertainty_impact_max']][
        ~cdf['uncertainty_impact_max'].isin(uncertainty_values)
    ]
    df = df.rename(
        columns={
            'component_id': 'component_ids_with_invalid_uncertainty_max',
            'uncertainty_impact_max': 'invalid_uncertainty_max',
        }
    )
    if not df.empty and notification:
        send_slack_notification(
            df,
            "An uncertainty max  ('not characterized','negligible', 'low', 'medium', 'high', 'very high'",
        )
    return df


# ------------------------------------------------------------------------------------------------------
# [ x ]  (Static - Components) Each component has at least one pathway column filled in
# -------------------------------------------------------------------------------------------------------


def non_missing_pathways(*, cdf: pd.DataFrame, notification: bool = True) -> pd.DataFrame:
    comp_col_list = get_pathway_col_list(cdf)
    df = cdf[['component_id']][~cdf.index.isin(cdf.dropna(subset=comp_col_list, how='all').index)]
    df = df.rename(columns={'component_id': 'component_id_has_no_pathways'})

    if not df.empty and notification:
        send_slack_notification(df, 'At least one pathway column filled in')
    return df


# --------------------------------------------------
# ----------------- Pathways Sheets ----------------
# --------------------------------------------------


def generate_combined_pathway_data_dict(*, google_doc_id: str, avail_pathways: list) -> dict:
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
        data_list = get_data_values_by_sheet_name(google_doc_id=google_doc_id, sheet_name=pathway)

        df = sheet_data_to_dataframe(data_list)
        metadata_dict = sheet_data_to_metadata(data_list)

        metadata_df_dict[pathway] = df
        metadata_dict_combined[pathway] = metadata_dict

    return {'metadata_dict_combined': metadata_dict_combined, 'metadata_df_dict': metadata_df_dict}


# --------------------------------------------------
# ------ Cross-check (Pathway / Component) ---------
# --------------------------------------------------


# --------------------------------------------------------------------------------------
# [ x ] (Static) Each pathway sheet has:  A non-empty pathway-id
# --------------------------------------------------------------------------------------


def non_empty_pathway_id(*, metadata_combined: dict, notification=True):
    pathways_sheet_name_mising_pathway_ids = []
    for pathway_sheet in metadata_combined['metadata_dict_combined'].keys():
        pathway_id = metadata_combined['metadata_dict_combined'][pathway_sheet]['pathway_id']
        if len(pathway_id) < 1:
            pathways_sheet_name_mising_pathway_ids.append(pathway_sheet)

    df = pd.DataFrame(
        {'pathway_sheet_name_missing_pathway_id': pathways_sheet_name_mising_pathway_ids}
    )

    if not df.empty and notification:
        send_slack_notification(df, 'Each pathway sheet has a non-empty pathway-id')
    return df


# --------------------------------------------------------------------------------------
# [ x ] (Static) Each pathway sheet has: A non-empty pathway name
# --------------------------------------------------------------------------------------
def non_empty_pathway_name(*, metadata_combined: dict, notification=True):
    pathways_sheet_name_mising_pathway_names = []
    for pathway_sheet in metadata_combined['metadata_dict_combined'].keys():
        pathway_name = metadata_combined['metadata_dict_combined'][pathway_sheet]['pathway_name']
        if len(pathway_name) < 1:
            pathways_sheet_name_mising_pathway_names.append(pathway_sheet)

    df = pd.DataFrame(
        {'pathway_sheet_name_missing_pathway_name': pathways_sheet_name_mising_pathway_names}
    )
    if not df.empty and notification:
        send_slack_notification(df, 'Each pathway sheet has a non-empty pathway-name')
    return df


# --------------------------------------------------------------------------------------
# [ x ] (Static) Each pathway sheet has:  A non-empty pathway description
# --------------------------------------------------------------------------------------
def non_empty_pathway_description(*, metadata_combined: dict, notification=True):
    pathways_sheet_description_mising_pathway_descriptions = []
    for pathway_sheet in metadata_combined['metadata_dict_combined'].keys():
        pathway_description = metadata_combined['metadata_dict_combined'][pathway_sheet][
            'pathway_description'
        ]
        if len(pathway_description) < 1:
            pathways_sheet_description_mising_pathway_descriptions.append(pathway_sheet)

    df = pd.DataFrame(
        {
            'pathway_sheet_description_missing_pathway_description': pathways_sheet_description_mising_pathway_descriptions
        }
    )
    if not df.empty and notification:
        send_slack_notification(df, 'Each pathway sheet has a non-empty pathway-description')
    return df


# --------------------------------------------------------------------------------------
# [ x ] (Static) Each pathway sheet has:  A non-empty VCL (range, 1-5)
# --------------------------------------------------------------------------------------
def non_empty_VCL(*, metadata_combined: dict, notification=True):
    pathways_sheet_VCL_mising_VCLs = []
    invalid_VCL_list = []
    for pathway_sheet in metadata_combined['metadata_dict_combined'].keys():
        pathway_VCL = metadata_combined['metadata_dict_combined'][pathway_sheet]['VCL']
        is_valid = [
            vcl_val.strip().isdigit() and 1 <= int(vcl_val.strip()) <= 5 for vcl_val in pathway_VCL
        ]
        if not all(is_valid):  # if either condition is False
            pathways_sheet_VCL_mising_VCLs.append(pathway_sheet)
            invalid_VCL_list.append(pathway_VCL)

    df = pd.DataFrame(
        {
            'pathway_sheet_VCL_missing_VCL': pathways_sheet_VCL_mising_VCLs,
            'invalid_VCL': invalid_VCL_list,
        }
    )

    if not df.empty and notification:
        send_slack_notification(df, 'Each pathway sheet has a non-empty VCL or out of range (1-5)')
    return df


# --------------------------------------------------------------------------------------
# [ x ] (Static) Each pathway sheet has:   A non-empty equation (numbers, parentheses, and +- symbols only)
# --------------------------------------------------------------------------------------
def non_empty_equation(*, metadata_combined: dict, notification=True):
    pathways_sheet_equation_invalid = []
    invalid_equation_list = []
    for pathway_sheet in metadata_combined['metadata_dict_combined'].keys():
        pathway_equation = metadata_combined['metadata_dict_combined'][pathway_sheet]['equation']
        equation_regex_match_bool = bool(re.match(r'^[0-9 ()[\]+-]+$', pathway_equation))
        if not equation_regex_match_bool:  # if regex match bool is False
            pathways_sheet_equation_invalid.append(pathway_sheet)
            invalid_equation_list.append(pathway_equation)

    df = pd.DataFrame(
        {
            'pathway_sheet_with_invalid_equation': pathways_sheet_equation_invalid,
            'invalid_equation': invalid_equation_list,
        }
    )

    if not df.empty and notification:
        send_slack_notification(
            df, 'Each pathway sheet has a non-empty equation or out of range (1-5)'
        )
    return df


# --------------------------------------------------------------------------------------
# [ x ] (Static) Each pathway sheet has:  A non-empty version number (X.X)
# --------------------------------------------------------------------------------------
def non_empty_version_number(*, metadata_combined: dict, notification=True):
    pathways_sheet_version_number_invalid = []
    invalid_version_number_list = []
    for pathway_sheet in metadata_combined['metadata_dict_combined'].keys():
        pathway_version_number = metadata_combined['metadata_dict_combined'][pathway_sheet][
            'version'
        ]
        version_number_regex_match_bool = bool(
            re.match('^[0-9.]+$', pathway_version_number)
        )  # matches digits + .
        if not version_number_regex_match_bool:  # if regex match bool is False
            pathways_sheet_version_number_invalid.append(pathway_sheet)
            invalid_version_number_list.append(pathway_version_number)

    df = pd.DataFrame(
        {
            'pathway_sheet_with_invalid_version_number': pathways_sheet_version_number_invalid,
            'invalid_version_number': invalid_version_number_list,
        }
    )

    if not df.empty and notification:
        send_slack_notification(
            df, 'Each pathway sheet has a non-empty version_number or out of range (1-5)'
        )
    return df


# --------------------------------------------------------------------------------------
# [ x ] (Static) Each pathway sheet has:  A non-empty revisions note
# --------------------------------------------------------------------------------------
def non_empty_revision_note(*, metadata_combined: dict, notification=True):
    pathways_sheet_revision_note_invalid = []
    for pathway_sheet in metadata_combined['metadata_dict_combined'].keys():
        pathway_revision_note = metadata_combined['metadata_dict_combined'][pathway_sheet][
            'revisions'
        ][-1]['note']

        if len(pathway_revision_note.strip()) < 1:  # if string is empty
            pathways_sheet_revision_note_invalid.append(pathway_sheet)

    df = pd.DataFrame(
        {'pathway_sheet_with_invalid_revision_note': pathways_sheet_revision_note_invalid}
    )
    if not df.empty and notification:
        send_slack_notification(df, 'Each pathway sheet has a non-empty revision_note')
    return df


# --------------------------------------------------
# ------ Cross-check (Pathway / Component) ---------
# --------------------------------------------------


# --------------------------------------------------------------------------------------
# [ x ]  (Static - Postprocess) All equation numbers correspond with numbered components
# --------------------------------------------------------------------------------------
def equation_number_component_number(
    *, metadata_combined: dict, notification: bool = True
) -> pd.DataFrame:
    """All equation numbers correspond with numbered components"""
    pathway_name_list = []
    equation_number_bool_list = []
    pathway_diff_nums_list = []
    for pathway in metadata_combined['metadata_df_dict']:
        digits_in_equation = set(
            [
                int(val)
                for val in re.findall(
                    r'\d+', metadata_combined['metadata_dict_combined'][pathway]['equation']
                )
                if val.isdigit()
            ]
        )
        digits_in_num_col = set(
            metadata_combined['metadata_df_dict'][pathway]['number'].str.strip('*').astype(int)
        )

        diff_nums_equation_num_col = list(digits_in_equation - digits_in_num_col)

        numbered_components_is_subset_bool = set(digits_in_equation).issubset(
            digits_in_num_col
        )  # If evals to True, then the digits in the equation are a subset of number
        if not numbered_components_is_subset_bool:
            pathway_name_list.append(pathway)
            equation_number_bool_list.append(numbered_components_is_subset_bool)
            pathway_diff_nums_list.append(diff_nums_equation_num_col)

    df = pd.DataFrame(
        {
            'pathway_name': pathway_name_list,
            'equation_number_bool': equation_number_bool_list,
            'invalid_numbers_in_equation': pathway_diff_nums_list,
        }
    )
    if not df.empty and notification:
        send_slack_notification(df, 'All equation numbers correspond with numbered components')
    return df


# - [ x ]  (Static - Postprocess) There is a version note corresponding with the current version number
# Takes the latest revision, checks if 'note' is empty. If empty, version_note_bool == False


def pathways_version_note_bool(
    *, metadata_combined: dict, notification: bool = True
) -> pd.DataFrame:
    """There is a version note corresponding with the current version number
    - Takes the latest revision, checks if 'note' is empty. If empty, version_note_bool == False"""

    pathway_name_list = []
    version_bool_list = []

    for pathway in metadata_combined['metadata_df_dict']:
        version_note = metadata_combined['metadata_dict_combined'][pathway]['revisions'][-1][
            'note'
        ].strip()
        version_note_bool = bool(version_note)
        if not version_note_bool:
            pathway_name_list.append(pathway)
            version_bool_list.append(version_note_bool)

    df = pd.DataFrame(
        {'pathway_name': pathway_name_list, 'latest_version_note_exists': version_bool_list}
    )
    if not df.empty and notification:
        send_slack_notification(
            df, 'There is a version note corresponding with the current version number'
        )
    return df


# --------------------------------------------------------------------------------------------------------------------------
# - [ x ]  (Static - Postprocess) All components appearing in pathway sheets appear in the component sheet.
# --------------------------------------------------------------------------------------------------------------------------
def pathway_componets_sheets_subset(
    *, metadata_combined: dict, cdf: pd.DataFrame, notification: bool = True
) -> pd.DataFrame:
    """All components appearing in pathway sheets appear in the component sheet."""
    unique_component_ids = set(cdf['component_id'])

    pathway_name_list = []
    pathway_component_id_bool_list = []
    pathway_invalid_componet_id_list = []

    for pathway in metadata_combined['metadata_df_dict']:
        pathway_component_ids = set(
            metadata_combined['metadata_df_dict'][pathway]['component_id'].to_list()
        )
        component_ids_in_pathway_not_in_component_sheet = list(
            pathway_component_ids - unique_component_ids
        )
        pathway_component_bool = pathway_component_ids.issubset(unique_component_ids)
        if not pathway_component_bool:
            pathway_name_list.append(pathway)
            pathway_component_id_bool_list.append(pathway_component_bool)
            pathway_invalid_componet_id_list.append(component_ids_in_pathway_not_in_component_sheet)
        break
    df = pd.DataFrame(
        {
            'pathway': pathway_name_list,
            'component_id_bool': pathway_component_id_bool_list,
            'invalid_component_ids': pathway_invalid_componet_id_list,
        }
    )

    if not df.empty and notification:
        send_slack_notification(
            df, 'All components appearing in pathway sheets appear in the component sheet'
        )
    return df


# --------------------------------------------------------------------------------------------------------------------------
# - [ x ]  (Static - Postprocess) All pathway ids in pathway sheets are reflected as a column in the component sheet
# --------------------------------------------------------------------------------------------------------------------------
def pathway_id_sheets_subset(
    *, metadata_combined: dict, cdf: pd.DataFrame, pathway_col_list: list, notification: bool = True
) -> pd.DataFrame:
    """All pathway ids in pathway sheets are reflected as a column in the component sheet"""
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

    df = pd.DataFrame(
        {
            'pathway': pathway_name_list,
            'pathway_id_is_subset_component_id': pathway_id_bool_list,
            'invalid_pathway_id': invalid_pathway_id_list,
        }
    )

    if not df.empty:
        send_slack_notification(
            df, 'All pathway ids in pathway sheets are reflected as a column in the component sheet'
        )
    return df


# --------------------------------------------------------------------------------------------------------------------------
# - [ x ]  (Static - Postprocess) All pathway ids in contributor sheet are reflected in the component sheet
# --------------------------------------------------------------------------------------------------------------------------
def contributor_pathway_subset_bool(
    *, cdf: pd.DataFrame, cont_df: pd.DataFrame, pathway_col_list: list, notification: bool = True
) -> pd.DataFrame:
    """All pathway ids in contributor sheet are reflected in the component sheet"""

    # Removes 'type', 'name', 'affiliation', 'initial', 'notes' from column names
    cont_df_pathway_ids = set(list(cont_df)) - set(
        ['type', 'name', 'affiliation', 'initial', 'notes']
    )
    cdf_pathways_not_in_cont_df = list(set(pathway_col_list) - cont_df_pathway_ids)
    cont_df_pathways_not_in_cdf = list(cont_df_pathway_ids - set(pathway_col_list))

    df = pd.DataFrame(
        {
            'pathway_ids_only_in_components_sheet': [cdf_pathways_not_in_cont_df],
            'pathway_ids_only_in_contributors_sheet': [cont_df_pathways_not_in_cdf],
        }
    )
    if not df.empty:  # ie if df is not empty
        send_slack_notification(
            df, 'All pathway ids in contributor sheet are reflected in the component sheet'
        )
    return df


# -----------------------------------------------------------------------------------------------------------------------------
# - [ x ]  (Static - Postprocess) All pathway versions in contributor sheets correspond with pathway versions in pathway sheets
# -----------------------------------------------------------------------------------------------------------------------------


def latest_pathway_version_match(
    *, metadata_combined: dict, cont_df: pd.DataFrame, notification: bool = True
) -> pd.DataFrame:
    """All pathway versions in contributor sheets correspond with pathway versions in pathway sheets"""

    pathway_name_list = []
    pathway_version_match_bool_list = []
    latest_pathway_version_contributor_df_list = []
    pathway_sheet_version_list = []

    cont_df_pathway_ids = set(list(cont_df)) - set(
        ['type', 'name', 'affiliation', 'initial', 'notes']
    )

    for pathway_key in metadata_combined['metadata_dict_combined']:
        pathway = metadata_combined['metadata_dict_combined'][pathway_key]['pathway_id']
        if pathway in cont_df_pathway_ids:
            contrib_df_pathway_latest_version = max(
                cont_df[pathway][~cont_df[pathway].replace('', np.nan).isnull()]
                .str.split(',')
                .explode()
                .astype(float)
                .to_list()
            )
            pv = metadata_combined['metadata_dict_combined'][pathway_key]['version']
            try:  # attempt to coerce string to float
                pathway_version = float(pv)
            except Exception(ValueError):
                pathway_version = pv
            pathway_version_match_bool = pathway_version == contrib_df_pathway_latest_version
            if not pathway_version_match_bool:
                pathway_name_list.append(pathway)
                pathway_version_match_bool_list.append(pathway_version_match_bool)
                latest_pathway_version_contributor_df_list.append(contrib_df_pathway_latest_version)
                pathway_sheet_version_list.append(pathway_version)

    df = pd.DataFrame(
        {
            'pathway': pathway_name_list,
            'pathway_version_match_bool': pathway_version_match_bool_list,
            'latest_pathway_version_contributor': latest_pathway_version_contributor_df_list,
            'pathway_sheet_version': pathway_sheet_version_list,
        }
    )

    if not df.empty and notification:
        send_slack_notification(
            df,
            'All pathway versions in contributor sheets correspond with pathway versions in pathway sheets',
        )
    return df


# ------------------------------------------------------------------------------------------------------------------------
# - [ x ]  (Static - Postprocess) Any component uncertainty range in pathway sheet is a subset of range in component sheet
# ------------------------------------------------------------------------------------------------------------------------


def pathway_uncertainty_range(
    *, metadata_combined: dict, cdf: pd.DataFrame, notification: bool = True
) -> pd.DataFrame:
    """Any component uncertainty range in pathway sheet is a subset of range in component sheet (see e.g. `nsad` and terrestrial versus ocean biomass sinking) - ( python on version release)
    - Each component in components sheet has a range defined by two columns ([uncertainty_impact_min, uncertainty_impact_max]).
    - These can be either: low medium high negligible very high. So we need to map these two ints, then for each pathway, for each component id, we need to map to ints, then map to the SOT (component sheet)
    """
    df_append = []

    for pathway in metadata_combined['metadata_df_dict']:
        pdf = metadata_combined['metadata_df_dict'][pathway]
        path_sub = pdf[['component_id', 'uncertainty_impact_min', 'uncertainty_impact_max']]
        com_sub = cdf[['component_id', 'uncertainty_impact_min', 'uncertainty_impact_max']]

        path_sub['uncertainty_impact_min_map'] = path_sub['uncertainty_impact_min'].map(um)
        path_sub['uncertainty_impact_max_map'] = path_sub['uncertainty_impact_max'].map(um)

        com_sub['uncertainty_impact_min_map'] = com_sub['uncertainty_impact_min'].map(um)
        com_sub['uncertainty_impact_max_map'] = com_sub['uncertainty_impact_max'].map(um)

        join_df = path_sub.merge(
            com_sub, on='component_id', how='left', suffixes=['_pathway_sheet', '_component_sheet']
        )

        join_df['uncertainty_impact_min_bool'] = (
            join_df['uncertainty_impact_min_map_pathway_sheet']
            >= join_df['uncertainty_impact_min_map_component_sheet']
        )
        join_df['uncertainty_impact_max_bool'] = (
            join_df['uncertainty_impact_max_map_pathway_sheet']
            <= join_df['uncertainty_impact_max_map_component_sheet']
        )

        uncertainty_mismatch_df = join_df[
            ~join_df[['uncertainty_impact_min_bool', 'uncertainty_impact_max_bool']].all(axis=1)
        ]
        uncertainty_mismatch_df['pathway'] = pathway
        uncertainty_mismatch_df = uncertainty_mismatch_df[
            [
                'pathway',
                'uncertainty_impact_min_pathway_sheet',
                'uncertainty_impact_max_pathway_sheet',
                'uncertainty_impact_min_component_sheet',
                'uncertainty_impact_max_component_sheet',
            ]
        ]
        df_append.append(uncertainty_mismatch_df)

    df = pd.concat(df_append)

    if not df.empty and notification:
        send_slack_notification(
            df,
            'Any component uncertainty range in pathway sheet is a subset of range in component sheet',
        )
    return df


def run():
    metadata_combined = generate_combined_pathway_data_dict(
        google_doc_id=google_doc_id, avail_pathways=avail_pathways
    )
    cdf = get_component_sheet(google_doc_id=google_doc_id)
    cont_df = contributors_df(google_doc_id=google_doc_id)
    pathway_col_list = get_pathway_col_list(cdf)

    equation_number_component_number(metadata_combined=metadata_combined)
    pathways_version_note_bool(metadata_combined=metadata_combined)
    pathway_componets_sheets_subset(metadata_combined=metadata_combined, cdf=cdf)
    pathway_id_sheets_subset(
        metadata_combined=metadata_combined, cdf=cdf, pathway_col_list=pathway_col_list
    )

    contributor_pathway_subset_bool(cdf=cdf, cont_df=cont_df, pathway_col_list=pathway_col_list)
    latest_pathway_version_match(metadata_combined=metadata_combined, cont_df=cont_df)
    pathway_uncertainty_range(metadata_combined=metadata_combined, cdf=cdf)

    non_empty_pathway_id(metadata_combined=metadata_combined)
    non_empty_pathway_name(metadata_combined=metadata_combined)
    non_empty_pathway_description(metadata_combined=metadata_combined)
    non_empty_VCL(metadata_combined=metadata_combined)
    non_empty_equation(metadata_combined=metadata_combined)
    non_empty_version_number(metadata_combined=metadata_combined)
    non_empty_revision_note(metadata_combined=metadata_combined)


if __name__ == '__main__':
    run()
