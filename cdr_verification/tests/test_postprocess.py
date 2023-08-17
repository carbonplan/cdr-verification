import pytest
from common import send_slack_notification, test_google_doc_id, test_gsheet_doc_name, avail_pathways
from postprocess import generate_combined_pathway_data_dict, equation_number_component_number, pathways_version_note_bool

# The goal of these tests are to pull data from the test workbook
# Which has examples of each error and test each postprocess step
#


# --------------------------------------------------
# ------------- Test Pathways Sheets ---------------
# --------------------------------------------------

## Pathways Sheets
# - [ x ]  (Static - Postprocess) There is a version note corresponding with the current version number
# - [ x ]  (Static - Postprocess) All equation numbers correspond with numbered components (ie all numbers in equation are a subset of the numbers found in the number column)

notification_flag = False 

 
def test_equation_number_component_number():
    metadata_combined = generate_combined_pathway_data_dict(test_google_doc_id, avail_pathways)
    df = equation_number_component_number(metadata_combined=metadata_combined, notification=notification_flag)
    assert df['equation_number_bool'].all() == False

def test_pathways_version_note_bool():
    metadata_combined = generate_combined_pathway_data_dict(test_google_doc_id, avail_pathways)
    df = pathways_version_note_bool(metadata_combined=metadata_combined, notification=notification_flag)
    assert df['latest_version_note_exists'].all() == False


# pathways_version_note_bool(metadata_dict=metadata_combined)
# pathway_componets_sheets_subset(metadata_dict=metadata_combined)
# pathway_id_sheets_subset(metadata_dict=metadata_combined)
# contributor_pathway_subset_bool(metadata_dict=metadata_combined)
# latest_pathway_version_match(metadata_dict=metadata_combined)
# pathway_uncertainty_range(metadata_dict=metadata_combined)

