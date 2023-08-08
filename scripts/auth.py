import gspread # type: ignore
import os 
from oauth2client.service_account import ServiceAccountCredentials # type: ignore
from googleapiclient.discovery import build
from google.oauth2 import service_account




private_key_id = os.environ.get('GOOGLE_PRIVATE_KEY_ID')
private_key = os.environ.get('GOOGLE_PRIVATE_KEY')
client_id = os.environ.get('GOOGLE_CLIENT_ID')

print(private_key_id)
print(private_key)
print(client_id)
scope = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]



cred_dict = {
  "type": "service_account",
  "project_id": "carbonplan",
  "private_key_id": private_key_id,
  "private_key": private_key,
  "client_email": "google-sheets@carbonplan.iam.gserviceaccount.com",
  "client_id": client_id,
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/google-sheets%40carbonplan.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}


gc = gspread.service_account_from_dict(cred_dict)

credentials = service_account.Credentials.from_service_account_info(cred_dict, scopes=scope)

service = build('sheets', 'v4', credentials=credentials)