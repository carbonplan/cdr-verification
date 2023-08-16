
# All of the Google auth should live in this file

from googleapiclient.discovery import build
from google.oauth2.service_account import Credentials
import os 
scope = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]

google_doc_id = '1wYGtKe6ex27wei-eo6oh7hgLHrMXn9wmpqGS_l05lCw'
gsheet_doc_name = 'NEW_CDR MRV Pathway Uncertainties'


try:
    cred_path = os.path.expanduser('~/keybase/google-sheets-key.json')

    creds = Credentials.from_service_account_file(
    cred_path,    scopes=scope
    )   
    service = build('sheets', 'v4', credentials=creds)
except:
    service = build('sheets', 'v4')






