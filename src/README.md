# Design Options:

1. Single parsing .py file (reads from google sheets, cleans, validates and writes to json)

1. Utils for reading sheets
1. script for validating input google sheets
1. script for writing to json

# Validation Checks

What validation checks do we want on the dataframe(s)

## Component Json

```json
{
  "component_id": "",
  "component_name": "",
  "quantification_target": "",
  "description": "",
  "uncertainty_type": [],
  "responsibility": "",
  "uncertainty_impact_min": "",
  "uncertainty_impact_max": "",
  "notes": "",
  "revisions": [
    {
      "date": "",
      "note": ""
    }
  ]
}
```

## Pathway JSON

```json
{
  "pathway_id": "",
  "pathway_name": "",
  "pathway_description": "",
  "VCL": ["min", "max"],
  "equation": "",
  "version": "",
  "revisions": [
    {
      "version": "",
      "date": "",
      "note": ""
    }
  ],
  "contributors": [
    {
      "type": "",
      "name": "",
      "affiliation": "",
      "note": ""
    }
  ],
  "components": [
    {
      "number": "",
      "category": "",
      "component_id": "",
      "component_name": "",
      "quantification_target": "",
      "description": "",
      "uncertainty_type": [],
      "responsibility": "",
      "uncertainty_impact_min": "",
      "uncertainty_impact_max": "",
      "notes": ""
    }
  ]
}
```

Top priority validation tasks in my mind are:

- [both] Data conforms to expected schema ([https://json-schema.org/](https://json-schema.org/))
- [components] Uniqueness of component ids
- [pathway] Double checks VCL calculation based pathway
- [components + pathway] Platonic component uncertainty type tags are superset of pathway type tags
- [components + pathway] Platonic component uncertainty is a superset of pathway component uncertainty

Second order validation tasks in my mind are:

- Checks for revision note
- No components that are not used by pathways
- No starred components in pathway equations
- If VCL changes for a pathway, validates that new major version is properly created (and writes out to new json)
- If other things have changed, validates that new minor version is properly created
- For any change compared to previous version, prints out all “connected” text (e.g. prints out all air-sea-gas-exchange text)
