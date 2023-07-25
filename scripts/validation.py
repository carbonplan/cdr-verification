

# ------------------ Imports -----------------------
import numpy as np
import pathlib 
import gspread # type: ignore
from oauth2client.service_account import ServiceAccountCredentials # type: ignore
from googleapiclient.discovery import build
from google.oauth2 import service_account

import validation_rules as vr 



# ------------------ Auth -----------------------


SECRET_FILE = str(pathlib.Path.home()) + '/keybase/google-sheets-key.json'
scope = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]
credentials = ServiceAccountCredentials.from_json_keyfile_name(SECRET_FILE, scope)


spreadsheet_id = '1wYGtKe6ex27wei-eo6oh7hgLHrMXn9wmpqGS_l05lCw'

sheet_id_dict = {'components': '552961890',
'DAC': '', 
'BiCRS': '', 
'EW': '', 
'TER_BIO': '', 
'OCEAN_BIO_no_harvest': '', 
'OCEAN_BIO_harvest': '', 
'OAE_echem': '', 
'OAE_mineral': '', 
'DOR': '', 
'BIOCHAR': '', 
'ALK_WASTE_MIN': '',

                 'validation_test': '1032325311'}

gsheet_doc_name = 'NEW_CDR MRV Pathway Uncertainties'

# ------------------ Validation ----------------------




service = build('sheets', 'v4', credentials=credentials)



# A non-empty component name 
non_empty_component_name = vr._validate_non_empty_component_name(sheetID=sheet_id_dict['validation_test'])
service.spreadsheets().batchUpdate(spreadsheetId=spreadsheet_id, body=non_empty_component_name).execute()

# A non-empty quantification target 
non_empty_quantification_target = vr._validate_non_empty_quantification_target(sheetID=sheet_id_dict['validation_test'])
service.spreadsheets().batchUpdate(spreadsheetId=spreadsheet_id, body=non_empty_quantification_target).execute()

#A non-empty description 
non_empty_description = vr._validate_non_empty_description(sheetID=sheet_id_dict['validation_test'])
service.spreadsheets().batchUpdate(spreadsheetId=spreadsheet_id, body=non_empty_description).execute()

# An uncertainty type
uncertainty_type = vr._validate_uncertainty_type(sheetID=sheet_id_dict['validation_test'])
service.spreadsheets().batchUpdate(spreadsheetId=spreadsheet_id, body=uncertainty_type).execute()




service.close()