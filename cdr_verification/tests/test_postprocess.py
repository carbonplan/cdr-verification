import pytest

from cdr_verification.common import avail_pathways, test_google_doc_id
from cdr_verification.postprocess import (
    contributor_pathway_subset_bool,
    equation_number_component_number,
    generate_combined_pathway_data_dict,
    latest_pathway_version_match,
    non_empty_component_name,
    non_empty_description,
    non_empty_equation,
    non_empty_pathway_description,
    non_empty_pathway_id,
    non_empty_pathway_name,
    non_empty_quantification_target,
    non_empty_revision_note,
    non_empty_VCL,
    non_empty_version_number,
    non_missing_pathways,
    pathway_componets_sheets_subset,
    pathway_id_sheets_subset,
    pathway_uncertainty_range,
    pathways_version_note_bool,
    unique_component_id,
    valid_responsibility,
    valid_uncertainty_max,
    valid_uncertainty_min,
    valid_uncertainty_type,
)
from cdr_verification.sheets_to_json import (
    contributors_df,
    get_component_sheet,
    get_pathway_col_list,
)

# The goal of these tests are to pull data from the test workbook
# Which has examples of each error and test each postprocess step
#


# --------------------------------------------------
# ------------- Test Pathways Sheets ---------------
# --------------------------------------------------

notification_flag = True


# --------------------------------------------------
#               Fixtures
# --------------------------------------------------


@pytest.fixture(scope='module')
def pathway_dict():
    yield generate_combined_pathway_data_dict(
        google_doc_id=test_google_doc_id, avail_pathways=avail_pathways
    )


@pytest.fixture(scope='module')
def cdf():
    yield get_component_sheet(google_doc_id=test_google_doc_id)


@pytest.fixture(scope='module')
def cont_df():
    yield contributors_df(google_doc_id=test_google_doc_id)


@pytest.fixture(scope='module')
def pathway_col_list():
    cdf = get_component_sheet(google_doc_id=test_google_doc_id)
    yield get_pathway_col_list(cdf)


# --------------------------------------------------
#               Tests
# --------------------------------------------------

# --------------------------------------------------
# ------ Cross-check (Pathway / Component) ---------
# --------------------------------------------------


def test_equation_number_component_number(pathway_dict):
    df = equation_number_component_number(
        metadata_combined=pathway_dict, notification=notification_flag
    )
    assert df['equation_number_bool'].all() is False


def test_pathways_version_note_bool(pathway_dict):
    df = pathways_version_note_bool(metadata_combined=pathway_dict, notification=notification_flag)
    assert df['latest_version_note_exists'].all() is False


def test_pathway_componets_sheets_subset(pathway_dict, cdf):
    df = pathway_componets_sheets_subset(
        metadata_combined=pathway_dict, cdf=cdf, notification=notification_flag
    )
    assert df['component_id_bool'].any() is False


def test_pathway_id_sheets_subset(pathway_dict, cdf, pathway_col_list):
    df = pathway_id_sheets_subset(
        metadata_combined=pathway_dict, cdf=cdf, pathway_col_list=pathway_col_list
    )
    assert df['pathway_id_is_subset_component_id'].all() is False


def test_contributor_pathway_subset_bool(cdf, cont_df, pathway_col_list):
    df = contributor_pathway_subset_bool(
        cdf=cdf, cont_df=cont_df, pathway_col_list=pathway_col_list
    )
    assert df.empty is False


def test_latest_pathway_version_match(pathway_dict, cont_df):
    df = latest_pathway_version_match(metadata_combined=pathway_dict, cont_df=cont_df)
    assert df.empty is False


def test_pathway_uncertainty_range(pathway_dict, cdf):
    df = pathway_uncertainty_range(metadata_combined=pathway_dict, cdf=cdf)
    assert df.empty is False


# --------------------------------------------------
# ---------------- Components Sheets ---------------
# --------------------------------------------------


def test_unique_component_id(cdf):
    df = unique_component_id(cdf=cdf)
    assert df.empty is False


def test_non_empty_component_name(cdf):
    df = non_empty_component_name(cdf=cdf)
    assert df.empty is False


def test_non_empty_quantification_target(cdf):
    df = non_empty_quantification_target(cdf=cdf)
    assert df.empty is False


def test_non_empty_description(cdf):
    df = non_empty_description(cdf=cdf)
    assert df.empty is False


def test_valid_uncertainty_type(cdf):
    df = valid_uncertainty_type(cdf=cdf)
    assert df.empty is False


def test_valid_responsibility(cdf):
    df = valid_responsibility(cdf=cdf)
    assert df.empty is False


def test_valid_uncertainty_min(cdf):
    df = valid_uncertainty_min(cdf=cdf)
    assert df.empty is False


def test_valid_uncertainty_max(cdf):
    df = valid_uncertainty_max(cdf=cdf)
    assert df.empty is False


def test_non_missing_pathways(cdf):
    df = non_missing_pathways(cdf=cdf)
    assert df.empty is False


# --------------------------------------------------
# ---------------- Pathways Sheets ---------------
# --------------------------------------------------


def test_non_empty_pathway_id(pathway_dict):
    df = non_empty_pathway_id(metadata_combined=pathway_dict)
    assert df.empty is False


def test_non_empty_pathway_name(pathway_dict):
    df = non_empty_pathway_name(metadata_combined=pathway_dict)
    assert df.empty is False


def test_non_empty_pathway_description(pathway_dict):
    df = non_empty_pathway_description(metadata_combined=pathway_dict)
    assert df.empty is False


def test_non_empty_VCL(pathway_dict):
    df = non_empty_VCL(metadata_combined=pathway_dict)
    assert df.empty is False


def test_non_empty_equation(pathway_dict):
    df = non_empty_equation(metadata_combined=pathway_dict)
    assert df.empty is False


def test_non_empty_version_number(pathway_dict):
    df = non_empty_version_number(metadata_combined=pathway_dict)
    assert df.empty is False


def test_non_empty_revision_note(pathway_dict):
    df = non_empty_revision_note(metadata_combined=pathway_dict)
    assert df.empty is False
