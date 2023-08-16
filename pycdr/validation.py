

# This script creates, clears and applies validation rules to google-sheets using the google-sheets python sdk. 
# The validation body requests are stored in `validation_rules.py`

# ------------------ Imports -----------------------
import numpy as np

import validation_rules as vr 
from common import auth_service, google_doc_id, sheet_id_dict


# ------------------ Auth -----------------------

service = auth_service()

# This dict contains the ids for each sheet, including some extra sheet ids



# Test sheet
component_sheet_name = sheet_id_dict['components_test']


# ------------------ Validation ----------------------


def remove_existing_conditional_formatting_all_sheets():
    """ This function removes any existing conditional formatting per sheet"""
    sheet_info = service.spreadsheets().get(spreadsheetId=google_doc_id, fields='sheets/conditionalFormats/ranges/sheetId').execute()
    
    requests = []

    for sheet in sheet_info['sheets']:
        if 'conditionalFormats' in sheet.keys():
            for condition in sheet['conditionalFormats']:
                requests.append({
                    'deleteConditionalFormatRule': {
                        'sheetId': condition['ranges'][0]['sheetId'],
                        'index': 0
                    }
                })
    body = {
        'requests': requests
    }
    if len(requests)>0:
        response = service.spreadsheets().batchUpdate(spreadsheetId=google_doc_id, body=body).execute()

remove_existing_conditional_formatting_all_sheets()


# # -------------------------------------------------------------------
# # ------------------ Components Sheet Validation --------------------
# # -------------------------------------------------------------------

# clear_existing_data_validation_rules
clear_existing = vr._clear_existing_data_validation_rules(sheetID=component_sheet_name)
service.spreadsheets().batchUpdate(spreadsheetId=google_doc_id, body=clear_existing).execute()

# Check component id is unique 
unique_component_id = vr._validate_components_unique_component_id(sheetID=component_sheet_name)
service.spreadsheets().batchUpdate(spreadsheetId=google_doc_id, body=unique_component_id).execute()

# A non-empty component name 
non_empty_component_name = vr._validate_components_non_empty_component_name(sheetID=component_sheet_name)
service.spreadsheets().batchUpdate(spreadsheetId=google_doc_id, body=non_empty_component_name).execute()

# A non-empty quantification target 
non_empty_quantification_target = vr._validate_components_non_empty_quantification_target(sheetID=component_sheet_name)
service.spreadsheets().batchUpdate(spreadsheetId=google_doc_id, body=non_empty_quantification_target).execute()

#A non-empty description 
non_empty_description = vr._validate_components_non_empty_description(sheetID=component_sheet_name)
service.spreadsheets().batchUpdate(spreadsheetId=google_doc_id, body=non_empty_description).execute()

# An uncertainty type
uncertainty_type = vr._validate_components_uncertainty_type(sheetID=component_sheet_name)
service.spreadsheets().batchUpdate(spreadsheetId=google_doc_id, body=uncertainty_type).execute()

# A responsibility (project, system) 
responsibility = vr._validate_components_responsibility(sheetID=component_sheet_name)
service.spreadsheets().batchUpdate(spreadsheetId=google_doc_id, body=responsibility).execute()

# An uncertainty min  (negligible, low, medium, high)
uncertainty_min = vr._validate_components_uncertainty_min(sheetID=component_sheet_name)
service.spreadsheets().batchUpdate(spreadsheetId=google_doc_id, body=uncertainty_min).execute()

# An uncertainty max (negligible, low, medium, high)
uncertainty_max = vr._validate_components_uncertainty_max(sheetID=component_sheet_name)
service.spreadsheets().batchUpdate(spreadsheetId=google_doc_id, body=uncertainty_max).execute()

# At least one pathway column filled in - BROKEN
missing_pathway = vr._validate_components_missing_pathway(sheetID=component_sheet_name)
service.spreadsheets().batchUpdate(spreadsheetId=google_doc_id, body=missing_pathway).execute()



# # --------------------------------------------------------------------
# # ------------------ Pathways Sheets Validation ----------------------
# # --------------------------------------------------------------------


# NOTE: This only applies validation for a pathways test sheet. 
# Once this looks good, we can iterate through all the pathways sheets

#clear_existing_data_validation_rules
clear_existing = vr._clear_existing_data_validation_rules(sheetID='1764033321')
service.spreadsheets().batchUpdate(spreadsheetId=google_doc_id, body=clear_existing).execute()


# Validate pathways for non empty: pathway_id, name, description, VCL, equation, version and revision
pathways_combined_non_empty = vr._validate_pathways_non_empty_pathway_id_name_description_VCL_equation_version_revision(sheetID='1764033321')
service.spreadsheets().batchUpdate(spreadsheetId=google_doc_id, body=pathways_combined_non_empty).execute()


# Regex issue - empty equation 
pathways_eq = vr._validate_pathways_check_equation(sheetID='1764033321')
service.spreadsheets().batchUpdate(spreadsheetId=google_doc_id, body=pathways_eq).execute()

# version number (X.X)
pathways_version = vr._validate_pathways_version_number_format(sheetID='1764033321')
service.spreadsheets().batchUpdate(spreadsheetId=google_doc_id, body=pathways_version).execute()



# # -----------------------------------------------------------------
# # ------------------ Contributors Validation ----------------------
# # -----------------------------------------------------------------

# All contributors have a name 
contributor_name = vr._validate_contributor_name(sheetID=sheet_id_dict['contributor_test'])
service.spreadsheets().batchUpdate(spreadsheetId=google_doc_id, body=contributor_name).execute()

# # All contributors are associated with at least one pathway version.
# contributor_associated_pathway = vr._validate_contributors_associated_pathways(sheetID=sheet_id_dict['contributor_test'], sheet_name='contributor_test', google_doc_id =google_doc_id, service=service)                                                               
# service.spreadsheets().batchUpdate(spreadsheetId=google_doc_id, body=contributor_associated_pathway).execute()

# Closes google service
service.close()