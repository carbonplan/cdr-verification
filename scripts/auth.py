
# All of the Google auth should live in this file

import os 
from oauth2client.service_account import ServiceAccountCredentials # type: ignore
from googleapiclient.discovery import build
from google.oauth2.service_account import Credentials

scope = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]

# TODO
# If local, grab creds.
# If CI, use magic creds


google_doc_id = '1wYGtKe6ex27wei-eo6oh7hgLHrMXn9wmpqGS_l05lCw'
gsheet_doc_name = 'NEW_CDR MRV Pathway Uncertainties'



service = build('sheets', 'v4')


# If local:
# creds = Credentials.from_service_account_file(
#     '/Users/nrhagen/keybase/google-sheets-key.json',    scopes=scope
# )
# service = build('sheets', 'v4', credentials=creds)




