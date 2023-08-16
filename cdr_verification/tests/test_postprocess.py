import pytest
from common import send_slack_notification, test_google_doc_id, test_gsheet_doc_name, avail_pathways
from postprocess import generate_combined_pathway_data_dict, equation_number_component_number

# The goal of these tests are to pull data from the test workbook
# Which has examples of each error and test each postprocess step
#


# --------------------------------------------------
# ------------- Test Pathways Sheets ---------------
# --------------------------------------------------

## Pathways Sheets
# - [ x ]  (Static - Postprocess) There is a version note corresponding with the current version number
# - [ x ]  (Static - Postprocess) All equation numbers correspond with numbered components (ie all numbers in equation are a subset of the numbers found in the number column)

metadata_combined = generate_combined_pathway_data_dict(test_google_doc_id, avail_pathways)

def test_equation_number_component_number(metadata_combined: dict):
    df = equation_number_component_number(metadata_combined=metadata_combined)
    # Assert part or whole dataframe matches expected failure mode



# equation_number_component_number(metadata_dict=metadata_combined)
# pathways_version_note_bool(metadata_dict=metadata_combined)
# pathway_componets_sheets_subset(metadata_dict=metadata_combined)
# pathway_id_sheets_subset(metadata_dict=metadata_combined)
# contributor_pathway_subset_bool(metadata_dict=metadata_combined)
# latest_pathway_version_match(metadata_dict=metadata_combined)
# pathway_uncertainty_range(metadata_dict=metadata_combined)

