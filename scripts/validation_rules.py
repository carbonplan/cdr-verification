


# -------------------- Reusable Components ------------------------



# -------------------- Drop Down Options --------------------------
uncertainty_type_options = ['execution', 'scientific', 'execution, scientific', 'execution', 'counterfactual']

# ---------------------- Row Numbers ------------------------------
startRowIndex = 2
endRowIndex = 54

## -------------------- Colors ------------------------------------
red_background_color = {"backgroundColor": {
              'red': 255/255,
              'green': 51/255,
              'blue': 51/255,
              'alpha': 0.5
              }}
# -------------------------------------------------------------------



# -------------------- Validation Rules -----------------------------

empty_cell_validation = {"type": "TEXT_NOT_CONTAINS",
                        "values": [
                            {
                            "userEnteredValue": ""
                            }
                        ]
                        }

# -------------------------------------------------------------------



# -------------------- Column Validation -----------------------------

# A non-empty component name 
def _validate_non_empty_component_name(sheetID, strict=True):
        return {'requests': [
            {
                'addConditionalFormatRule': {
                    'rule':{
                    'ranges': {
                            'sheetId': sheetID,
                            'startRowIndex': startRowIndex,
                            'endRowIndex': endRowIndex,
                            'startColumnIndex': 4,
                            'endColumnIndex': 5
                        },
                    "booleanRule": {
                        "condition": empty_cell_validation,
            "format": red_background_color
            }}}}
            ]
        }

# A non-empty quantification target 
def _validate_non_empty_quantification_target(sheetID, strict=True):
        return {'requests': [
            {
                'addConditionalFormatRule': {
                    'rule':{
                    'ranges': {
                            'sheetId': sheetID,
                            'startRowIndex': startRowIndex,
                            'endRowIndex': endRowIndex,
                            'startColumnIndex': 6,
                            'endColumnIndex': 7
                        },
                    "booleanRule": {
                        "condition": empty_cell_validation,
            "format": red_background_color
            }}}}
            ]
        }

# A non-empty description 
def _validate_non_empty_description(sheetID, strict=True):
        return {'requests': [
            {
                'addConditionalFormatRule': {
                    'rule':{
                    'ranges': {
                            'sheetId': sheetID,
                            'startRowIndex': startRowIndex,
                            'endRowIndex': endRowIndex,
                            'startColumnIndex': 11,
                            'endColumnIndex': 12
                        },
                    "booleanRule": {
                        "condition": empty_cell_validation,
            "format": red_background_color
            }}}}
            ]
        }

# An uncertainty type (execution, scientific, counterfactual) 

def _validate_uncertainty_type(sheetID, strict=True):

    return {
        "requests": [
            {
                "setDataValidation": {
                    "range": {
                        "sheetId": sheetID,
                        "startRowIndex": startRowIndex,
                        "endRowIndex": endRowIndex,
                        'startColumnIndex': 7,
                        'endColumnIndex': 8
                    },
                    "rule": {
                        "condition": {"type": "ONE_OF_LIST", "values": [{"userEnteredValue": option} for option in uncertainty_type_options]},
                        "strict": True,
                        'showCustomUi': True,
                        "inputMessage": f"Values are not in {uncertainty_type_options}"
                    },
                }
            }
        ]
    }


