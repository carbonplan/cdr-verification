<img
  src='https://carbonplan-assets.s3.amazonaws.com/monogram/dark-small.png'
  height='48'
/>

# carbonplan / CDR verification

**interactive tool for mapping key uncertainties in different CDR pathways**

[![GitHub][github-badge]][github]
[![Build Status]][actions]
![MIT License][]
[![DOI](https://img.shields.io/badge/DOI-10.5281/zenodo.7796286-blue?style=flat-square)](https://doi.org/10.5281/zenodo.7796286)

[github]: https://github.com/carbonplan/cdr-mrv
[github-badge]: https://badgen.net/badge/-/github?icon=github&label
[build status]: https://github.com/carbonplan/cdr-mrv/actions/workflows/main.yml/badge.svg
[actions]: https://github.com/carbonplan/cdr-mrv/actions/workflows/main.yaml
[mit license]: https://badgen.net/badge/license/MIT/blue

## to build the site locally

Assuming you already have `Node.js` installed, you can install the build dependencies as:

```shell
npm install .
```

To start a development version of the site, simply run:

```shell
npm run dev
```

and then visit `http://localhost:5001/research/cdr-verification` in your browser.

## to build the pathway data

You will need to unlock the Google Sheets key using [`git-crypt`](https://github.com/AGWA/git-crypt). Unlocking is simplest using a symmetric secret key securely shared by a team member.

You may then run the command to pull all pathway and legend data.

```shell
python scripts/sheets_to_json.py
pre-commit run --all-files
```

## Breakdown of python scripts

1. [validation.py] Create and add validation rules to google-sheets using the google-sheets python sdk.
1. [validation_rules.py] A set of templating dicts that store request bodies for google-sheets validation rules.
1. [postprocess.py] A set of checks that read the CDR sheets and check if some of the validation rules are met. Returns dataframes and notifies via slack webhook.
1. [auth.py] All of the Google auth should live here.
1. [sheet_to_json.py] Scripts to convert the google sheets to .json for the web tool.

## license

All the code in this repository is [MIT](https://choosealicense.com/licenses/mit/) licensed, but we request that you please provide attribution if reusing any of our digital content (graphics, logo, articles, etc.).

## about us

CarbonPlan is a non-profit organization that uses data and science for climate action. We aim to improve the transparency and scientific integrity of climate solutions with open data and tools. Find out more at [carbonplan.org](https://carbonplan.org/) or get in touch by [opening an issue](https://github.com/carbonplan/cdr-verification/issues/new) or [sending us an email](mailto:hello@carbonplan.org).
