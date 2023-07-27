


# -------------------- Reusable Components ------------------------



# -------------------- Drop Down Options --------------------------
uncertainty_type_options = ['execution', 'scientific', 'execution, scientific', 'execution', 'counterfactual']
responsibility_type_options = ['project', 'system'] 
uncertainty_impact_options = ['not characterized','negligible', 'low', 'medium', 'high', 'very high']
# ---------------------- Row Numbers ------------------------------
# Components Sheet
components_start_row_index = 2
components_end_row_index = 54

## -------------------- Colors ------------------------------------
gray_background_color = {"backgroundColor": {
              'red': 153/255,
              'green': 153/255,
              'blue': 153/255,
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
# -------------------------------------------------------------------
# -------------------- Components Sheet Validation ------------------
# -------------------------------------------------------------------
# -------------------------------------------------------------------


# ----------------------------------------------------------
# --------------------- UNIQUE_COLUMN ----------------------
# ----------------------------------------------------------

# Check component id is unique 
def _validate_components_unique_component_id(sheetID, strict=True):
        return {'requests': [
            {
                'addConditionalFormatRule': {
                    'rule':{
                    'ranges': {
                            'sheetId': sheetID,
                            'startRowIndex': components_start_row_index,
                            'endRowIndex': components_end_row_index,
                            'startColumnIndex': 3,
                            'endColumnIndex': 4
                        },
              "booleanRule": {
                "condition": {
                  "type": "CUSTOM_FORMULA",
                  "values": [
                    {
                      "userEnteredValue": f'=NOT(COUNTIF($D${components_start_row_index}:D{components_end_row_index}, INDIRECT(ADDRESS(ROW(),COLUMN(),)))=1)'

                    }
                  ],             

                }, "format": gray_background_color}}}}
            ]
        }



# ----------------------------------------------------------
# ---------------------- BLANK_CELL ------------------------
# ----------------------------------------------------------



# A non-empty component name 
def _validate_components_non_empty_component_name(sheetID, strict=True):
        return {'requests': [
            {
                'addConditionalFormatRule': {
                    'rule':{
                    'ranges': {
                            'sheetId': sheetID,
                            'startRowIndex': components_start_row_index,
                            'endRowIndex': components_end_row_index,
                            'startColumnIndex': 4,
                            'endColumnIndex': 5
                        },
                    "booleanRule": {
                        "condition": empty_cell_validation,
            "format": gray_background_color
            }}}}
            ],
        }


# A non-empty quantification target 
def _validate_components_non_empty_quantification_target(sheetID, strict=True):
        return {'requests': [
            {
                'addConditionalFormatRule': {
                    'rule':{
                    'ranges': {
                            'sheetId': sheetID,
                            'startRowIndex': components_start_row_index,
                            'endRowIndex': components_end_row_index,
                            'startColumnIndex': 6,
                            'endColumnIndex': 7
                        },
                    "booleanRule": {
                        "condition": empty_cell_validation,
            "format": gray_background_color
            }}}}
            ]
        }

# A non-empty description 
def _validate_components_non_empty_description(sheetID, strict=True):
    
        return {'requests': [
            {
                'addConditionalFormatRule': {
                    'rule':{
                    'ranges': {
                            'sheetId': sheetID,
                            'startRowIndex': components_start_row_index,
                            'endRowIndex': components_end_row_index,
                            'startColumnIndex': 11,
                            'endColumnIndex': 12
                        },
                    "booleanRule": {
                        "condition": empty_cell_validation,
            "format": gray_background_color
            }}}}
            ]
        }

# ----------------------------------------------------------
# ---------------------- ONE_OF_LIST -----------------------
# ----------------------------------------------------------

# An uncertainty type (execution, scientific, counterfactual) 
def _validate_components_uncertainty_type(sheetID, strict=True):

    return {
        "requests": [
            {
                "setDataValidation": {
                    "range": {
                        "sheetId": sheetID,
                        "startRowIndex": components_start_row_index,
                        "endRowIndex": components_end_row_index,
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

# A responsibility (project, system) 
def _validate_components_responsibility(sheetID, strict=True):
    return {
        "requests": [
            {
                "setDataValidation": {
                    "range": {
                        "sheetId": sheetID,
                        "startRowIndex": components_start_row_index,
                        "endRowIndex": components_end_row_index,
                        'startColumnIndex': 8,
                        'endColumnIndex': 9
                    },
                    "rule": {
                        "condition": {"type": "ONE_OF_LIST", "values": [{"userEnteredValue": option} for option in responsibility_type_options]},
                        "strict": True,
                        'showCustomUi': True,
                        "inputMessage": f"Values are not in {responsibility_type_options}"
                    },
                }
            }
        ]
    }

# An uncertainty min (negligible, low, medium, high)
def _validate_components_uncertainty_min(sheetID, strict=True):
    return {
        "requests": [
            {
                "setDataValidation": {
                    "range": {
                        "sheetId": sheetID,
                        "startRowIndex": components_start_row_index,
                        "endRowIndex": components_end_row_index,
                        'startColumnIndex': 9,
                        'endColumnIndex': 10
                    },
                    "rule": {
                        "condition": {"type": "ONE_OF_LIST", "values": [{"userEnteredValue": option} for option in uncertainty_impact_options]},
                        "strict": True,
                        'showCustomUi': True,
                        "inputMessage": f"Values are not in {uncertainty_impact_options}"
                    },
                }
            }
        ]
    }


# An uncertainty  max (negligible, low, medium, high)
def _validate_components_uncertainty_max(sheetID, strict=True):
    return {
        "requests": [
            {
                "setDataValidation": {
                    "range": {
                        "sheetId": sheetID,
                        "startRowIndex": components_start_row_index,
                        "endRowIndex": components_end_row_index,
                        'startColumnIndex': 10,
                        'endColumnIndex': 11
                    },
                    "rule": {
                        "condition": {"type": "ONE_OF_LIST", "values": [{"userEnteredValue": option} for option in uncertainty_impact_options]},
                        "strict": True,
                        'showCustomUi': True,
                        "inputMessage": f"Values are not in {uncertainty_impact_options}"
                    },
                }
            }
        ]
    }


# - BROKEN At least one pathway column filled in - BROKEN
# def _validate_components_missing_pathway(sheetID, strict=True):
#    return {
#      "requests": [
#        {
#          "setDataValidation": {
#            "range": {
#              "sheetId": sheetID,
#              "startRowIndex": components_start_row_index,
#              "endRowIndex": components_end_row_index,
#              "startColumnIndex": 12,
#              "endColumnIndex": 24
#            },
#            "rule": {
#              "condition": {
#                "type": "CUSTOM_FORMULA",
#                "values": [
#                  {
#                    "userEnteredValue": "=COUNTA(M1:W1)>0"
#                  }
#                ]
#              },
#              "inputMessage": "Please enter at least one value in each row",
#              "strict": True
#            }
#          }
#        }
#      ]
#    }

def _clear_existing_data_validation_rules(sheetID, strict=True):

    return {
        'requests': [
            {
                'setDataValidation': {
                    'range': {
                        "sheetId": sheetID,
                        "startRowIndex": 0,
                        "endRowIndex": 100,
                        "startColumnIndex": 0,
                        "endColumnIndex": 100
                    },
                    'rule': None
                }
            }
        ]
    }

# -------------------------------------------------------------------
# -------------------------------------------------------------------
# -------------------- Pathways Sheet Validation ------------------
# -------------------------------------------------------------------
# -------------------------------------------------------------------

# A non-empty pathway-id 

def _validate_pathways_non_empty_pathway_id_name_description_VCL_equation_version_revision(sheetID, strict=True):


    return {'requests': [
            {'addConditionalFormatRule': {
                'rule':{
                'ranges': {
                        'sheetId': sheetID,
                        'startRowIndex': 1,
                        'endRowIndex': 7,
                        'startColumnIndex': 1,
                        'endColumnIndex': 2
                    },
                "booleanRule": {
                    "condition": empty_cell_validation,
                "format": gray_background_color            
                }}}}
            ]
        }

#   VCL (range, 1-5) -
# NEEDED

#   equation (numbers, parentheses, and +- symbols only) 
def _validate_pathways_check_equation(sheetID, strict=True):

    return {'requests': [
          {'setDataValidation': {
            'range': {
                    'sheetId': sheetID,
                    'startRowIndex': 4,
                    'endRowIndex': 5,
                    'startColumnIndex': 1,
                    'endColumnIndex': 2
            },
            'rule': {
                'condition': {
                    'type': 'CUSTOM_FORMULA',
                    'values': [{
                        'userEnteredValue': '=REGEXMATCH(B5, "[0-9,\(\)\s\+\-]+")'
                    }]
                }
            }
        }
    }]}

# A version number (X.X) - (google-sheets-api)
def _validate_pathways_version_number_format(sheetID, strict=True):

    return {'requests': [
          {'setDataValidation': {
            'range': {
                    'sheetId': sheetID,
                    'startRowIndex': 5,
                    'endRowIndex': 6,
                    'startColumnIndex': 1,
                    'endColumnIndex': 2
            },
            'rule': {
                'condition': {
                    'type': 'CUSTOM_FORMULA',
                    'values': [{
                        'userEnteredValue': '=REGEXMATCH(TO_TEXT(B6), "\d+\.\d{1}")'
                    }]
                }
            }
        }
    }]}


# -------------------------------------------------------------------
# -------------------------------------------------------------------
# ----------------- Contributors Sheet Validation -------------------
# -------------------------------------------------------------------
# -------------------------------------------------------------------


def _validate_contributor_name(sheetID, strict=True):
    return {'requests': [
        {
            'addConditionalFormatRule': {
                'rule':{
                'ranges': {
                        'sheetId': sheetID,
                        'startRowIndex': 2,
                        'endRowIndex': 100,
                        'startColumnIndex': 1,
                        'endColumnIndex': 2
                    },
                "booleanRule": {
                    "condition": empty_cell_validation,
        "format": gray_background_color
        }}}}
        ]}