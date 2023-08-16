# CDR-Verification Python

This section of the repo contains the following Python scripts:

1. [validation.py] Create and add validation rules to google-sheets using the google-sheets python sdk.
1. [validation_rules.py] A set of templating dicts that store request bodies for google-sheets validation rules.
1. [postprocess.py] A set of checks that read the CDR sheets and check if some of the validation rules are met. Returns dataframes and notifies via slack webhook.
1. [auth.py] All of the Google auth should live here.
1. [sheet_to_json.py] Scripts to convert the google sheets to .json for the web tool.
