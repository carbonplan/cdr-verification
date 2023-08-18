import pytest
from cdr_verification.common import send_slack_notification, test_google_doc_id, test_gsheet_doc_name, avail_pathways
from cdr_verification.postprocess import (generate_combined_pathway_data_dict, equation_number_component_number, pathways_version_note_bool, pathway_componets_sheets_subset, pathway_id_sheets_subset, contributor_pathway_subset_bool)
from cdr_verification.sheets_to_json import get_component_sheet, get_pathway_col_list, contributors_df
# The goal of these tests are to pull data from the test workbook
# Which has examples of each error and test each postprocess step
#


# --------------------------------------------------
# ------------- Test Pathways Sheets ---------------
# --------------------------------------------------

## Pathways Sheets
# - [ x ]  (Static - Postprocess) There is a version note corresponding with the current version number
# - [ x ]  (Static - Postprocess) All equation numbers correspond with numbered components (ie all numbers in equation are a subset of the numbers found in the number column)

notification_flag = True 

 
# --------------------------------------------------
#               Fixtures
# --------------------------------------------------

@pytest.fixture(scope="module")
def pathway_dict():
    yield generate_combined_pathway_data_dict(google_doc_id=test_google_doc_id, avail_pathways=avail_pathways)

@pytest.fixture(scope="module")
def cdf():
    yield get_component_sheet(google_doc_id=test_google_doc_id)

@pytest.fixture(scope="module")
def cont_df():
    yield contributors_df(google_doc_id=test_google_doc_id)

@pytest.fixture(scope="module")
def pathway_col_list():
    cdf = get_component_sheet(google_doc_id=test_google_doc_id)
    yield get_pathway_col_list(cdf)

# --------------------------------------------------
#               Tests
# --------------------------------------------------

def test_equation_number_component_number(pathway_dict):
    df = equation_number_component_number(metadata_combined=pathway_dict, notification=notification_flag)
    assert df['equation_number_bool'].all() == False

def test_pathways_version_note_bool(pathway_dict):
    df = pathways_version_note_bool(metadata_combined=pathway_dict, notification=notification_flag)
    assert df['latest_version_note_exists'].all() == False

def test_pathway_componets_sheets_subset(pathway_dict, cdf):
    df = pathway_componets_sheets_subset(metadata_combined=pathway_dict, cdf=cdf, notification=notification_flag)
    assert df['component_id_bool'].any() == False 
    
def test_pathway_id_sheets_subset(pathway_dict,cdf, pathway_col_list):
    df = pathway_id_sheets_subset(metadata_combined=pathway_dict, cdf=cdf, pathway_col_list=pathway_col_list)
    assert df['pathway_id_is_subset_component_id'].all() == False

def test_contributor_pathway_subset_bool(cdf,cont_df,pathway_col_list):
    df = contributor_pathway_subset_bool(cdf=cdf, cont_df=cont_df, pathway_col_list = pathway_col_list)
    assert df.empty == False

# latest_pathway_version_match(metadata_dict=metadata_combined)
# pathway_uncertainty_range(metadata_dict=metadata_combined)

