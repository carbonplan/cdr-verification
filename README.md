<p align="left" >
<a href='https://carbonplan.org'>
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://carbonplan-assets.s3.amazonaws.com/monogram/light-small.png">
  <img alt="CarbonPlan monogram." height="48" src="https://carbonplan-assets.s3.amazonaws.com/monogram/dark-small.png">
</picture>
</a>
</p>

# carbonplan / CDR verification

**interactive tool for mapping key uncertainties in different CDR pathways**

[![CI](https://github.com/carbonplan/cdr-verification/actions/workflows/main.yml/badge.svg)](https://github.com/carbonplan/cdr-verification/actions/workflows/main.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![DOI](https://img.shields.io/badge/DOI-10.5281/zenodo.7796286-blue)](https://doi.org/10.5281/zenodo.7796286)

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

## license

All the code in this repository is [MIT](https://choosealicense.com/licenses/mit/)-licensed, but we request that you please provide attribution if reusing any of our digital content (graphics, logo, articles, etc.).

## about us

CarbonPlan is a nonprofit organization that uses data and science for climate action. We aim to improve the transparency and scientific integrity of climate solutions with open data and tools. Find out more at [carbonplan.org](https://carbonplan.org/) or get in touch by [opening an issue](https://github.com/carbonplan/cdr-verification/issues/new) or [sending us an email](mailto:hello@carbonplan.org).
