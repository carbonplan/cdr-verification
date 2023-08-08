import gspread # type: ignore
import os 
from oauth2client.service_account import ServiceAccountCredentials # type: ignore
from googleapiclient.discovery import build
from google.oauth2 import service_account
from google.oauth2.service_account import Credentials

scope = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]


creds = Credentials.from_service_account_file(
    os.environ.get("GOOGLE_CREDENTIALS"),    scopes=scope
)

service = build('sheets', 'v4', credentials=creds)



# gc = gspread.service_account()
# gc = gspread.service_account_from_dict(cred_dict)

# credentials = service_account.Credentials.from_service_account_info(cred_dict, scopes=scope)

# service = build('sheets', 'v4', credentials=credentials)

