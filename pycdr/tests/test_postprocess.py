import pytest

from common import send_slack_notification, test_google_doc_id, test_gsheet_doc_name
from postprocess import generate_combined_pathway_data_dict

# The goal of these tests are to pull data from the test workbook
# Which has examples of each error and test each postprocess step

def test_