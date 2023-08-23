import os

import pandas as pd
import requests
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build

# ---------------------------------------------------------------------------------------------
#                                 IDs and Names
# ---------------------------------------------------------------------------------------------


scope = ['https://spreadsheets.google.com/feeds', 'https://www.googleapis.com/auth/drive']

# Production Ids/Names
google_doc_id = '1wYGtKe6ex27wei-eo6oh7hgLHrMXn9wmpqGS_l05lCw'
gsheet_doc_name = 'NEW_CDR MRV Pathway Uncertainties'

avail_pathways = [
    'DAC',
    'BiCRS',
    'EW',
    'TER_BIO',
    'OCEAN_BIO_no_harvest',
    'OCEAN_BIO_harvest',
    'OAE_echem',
    'OAE_mineral',
    'DOR',
    'BIOCHAR',
    'ALK_WASTE_MIN',
]
pathways_data_columns = [
    'number',
    'category',
    'component_id',
    'name',
    'quantification_target',
    'uncertainty_type',
    'responsibility',
    'uncertainty_impact_min',
    'uncertainty_impact_max',
    'description',
    'notes',
]
components_non_pathway_cols = [
    'revisions',
    'notes',
    'category',
    'component_id',
    'component_name',
    'secondary_name',
    'quantification_target',
    'uncertainty_type',
    'responsibility',
    'uncertainty_impact_min',
    'uncertainty_impact_max',
    'description',
]

uncertainty_values = ['not characterized', 'negligible', 'low', 'medium', 'high', 'very high']
responsibility_values = ['system', 'project']

sheet_id_dict = {
    'components': '552961890',
    'DAC': '1836739710',
    'BiCRS': '315597137',
    'EW': '83914401',
    'TER_BIO': '1216202441',
    'OCEAN_BIO_no_harvest': '141361092',
    'OCEAN_BIO_harvest': '634124525',
    'OAE_echem': '960206408',
    'OAE_mineral': '670121219',
    'DOR': '2050001783',
    'BIOCHAR': '1891518923',
    'ALK_WASTE_MIN': '2039248866',
    'CONTRIBUTORS': '959291730',
    'contributor_test': '1652596480',
    'pathways_test': '1764033321',
    'components_test': '1032325311',
}

# Test Ids and Names

test_google_doc_id = '1MFM3hs1lB50YkgbPJYBMcvYMRJ6v8VhOOKCUDwsfjiw'
test_gsheet_doc_name = 'PYTEST_NEW_CDR_MRV'

# ---------------------------------------------------------------------------------------------
#                                 Common Functions
# ---------------------------------------------------------------------------------------------


def auth_service():
    if os.path.exists('~/keybase/google-sheets-key.json'):
        cred_path = os.path.expanduser('~/keybase/google-sheets-key.json')
        creds = Credentials.from_service_account_file(cred_path, scopes=scope)
        service = build('sheets', 'v4', credentials=creds)
    else:
        service = build('sheets', 'v4')
    return service


def send_slack_notification(df: pd.DataFrame, validation_name: str):
    """Send slack notifications to the cdr-verification-updates slack channel

    :param df: Input DataFrame of reported inconsistencies
    :type df: pd.DataFrame
    :param validation_name: A description of the validation check
    :type validation_name: str
    """
    dataframe_markdown = df.to_markdown()
    slack_webhook_url = os.environ.get('SLACK_WEBHOOK_URL')
    validation_description = pd.DataFrame({'Validation': [validation_name]}).to_markdown(
        index=False
    )
    r = requests.post(
        slack_webhook_url,
        json={'text': f'```{validation_description}``` ```{dataframe_markdown}```'},
    )

    r.raise_for_status()


def get_pathway_col_list(cdf: pd.DataFrame) -> list:
    """Returns a set of pathway column names for the components sheets

    :param df: Pathway specific DataFrame
    :type df: pd.DataFrame
    :return: list of pathway col names
    :rtype: list
    """
    return list(set(list(cdf)) - set(components_non_pathway_cols))
