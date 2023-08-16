

from googleapiclient.discovery import build
from google.oauth2.service_account import Credentials
import os 
import requests 
import pandas as pd 


# ---------------------------------------------------------------------------------------------
#                                 IDs and Names
# ---------------------------------------------------------------------------------------------

scope = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]

google_doc_id = '1wYGtKe6ex27wei-eo6oh7hgLHrMXn9wmpqGS_l05lCw'
gsheet_doc_name = 'NEW_CDR MRV Pathway Uncertainties'
sheet_id_dict = {'components': '552961890',
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
'pathways_test':'1764033321',
'components_test': '1032325311'}


# ---------------------------------------------------------------------------------------------
#                                 Common Functions
# ---------------------------------------------------------------------------------------------


def auth_service():
    try:
        cred_path = os.path.expanduser('~/keybase/google-sheets-key.json')

        creds = Credentials.from_service_account_file(
        cred_path,    scopes=scope
        )   
        service = build('sheets', 'v4', credentials=creds)
    except:
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
    slack_webhook_url = os.environ.get("SLACK_WEBHOOK_URL")
    validation_description = pd.DataFrame({'Validation': [validation_name]}).to_markdown(index=False)
    r = requests.post(slack_webhook_url, json={'text': f'```{validation_description}``` ```{dataframe_markdown}``` \n \n'})

    r.raise_for_status()





