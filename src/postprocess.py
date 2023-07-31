# ---------------------------------------------------------
#      This script is intended as a `postprocess`         #
#      check to validate sections of the CDR-MRV sheets   # 
#      that are not covered by google-sheets validation   #
# ---------------------------------------------------------

# ------------------ Imports -----------------------
import numpy as np
import json
import pathlib
import gspread # type: ignore
import pandas as pd # type: ignore
from oauth2client.service_account import ServiceAccountCredentials # type: ignore
from ast import literal_eval

from sheets_to_json import get_component_sheet, gsheet_doc_name, avail_pathways, credentials, gsheet_to_data_list, sheet_data_to_dataframe, sheet_data_to_metadata



# ------------------ Auth -----------------------

gc = gspread.authorize(credentials)




# cdf = get_component_sheet(gsheet_doc_name)

pathway = 'DAC'
data_list = gsheet_to_data_list(gsheet_doc_name, pathway)
df = sheet_data_to_dataframe(data_list)
metadata_dict = sheet_data_to_metadata(data_list)


digits_in_equation = [int(val) for val in list(metadata_dict['equation']) if val.isdigit()]

is_subset_bool = set(digits_in_equation).issubset(set(df['number'].astype(int))) # If evals to True, then the digits in the equation are a subset of number

if is_subset_bool:
    pass
    # Add some sort of logging or writing a file?

# Checks:

## Pathways Sheets
# - [ ]  (Static - Postprocess) VCL range matches component uncertainty count
# - [ ]  (Static - Postprocess) There is a version note corresponding with the current version number
# - [ ]  (Static - Postprocess) All equation numbers correspond with numbered components (ie all numbers in equation are a subset of the numbers found in the number column)


### Cross-check (Pathway / Component)

# - [ ]  (Static - Postprocess) All components appearing in pathway sheets appear in the component sheet ( python on version release)
# - [ ]  (Static - Postprocess) Any component uncertainty range in pathway sheet is a subset of range in component sheet (see e.g. `nsad` and terrestrial versus ocean biomass sinking) - ( python on version release)
# - [ ]  (Static - Postprocess) All pathway ids in pathway sheets are reflected as a column in the component sheet - ( python on version release)
# - [ ]  (Static - Postprocess) All pathway ids in contributor sheet are reflected in the component sheet - ( python on version release)
# - [ ]  (Static - Postprocess) All pathway versions in contributor sheets correspond with pathway versions in pathway sheets - ( python on version release)