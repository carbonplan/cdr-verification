
# All of the Google auth should live in this file


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





