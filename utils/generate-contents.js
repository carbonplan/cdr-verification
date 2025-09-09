const path = require('path')
const fs = require('fs')
const { pathways, pathwayContent } = require('./data.js')

// Generate the contents list
const fileContent = JSON.stringify(
  pathways.map(({ pathway_id, pathway_name, pathway_description }) => ({
    page: `research/cdr-verification/${pathway_id}`,
    date: pathwayContent[pathway_id].metadata.revisions.sort(
      (a, b) => Number(b.version) - Number(a.version)
    )[0].date,
    metadata: {
      type: 'tool',
      title: pathway_name,
      summary: pathway_description,
    },
  }))
)

// Write the contents.json file
fs.writeFileSync(
  path.join(
    process.cwd(),
    'public',
    'research',
    'cdr-verification',
    'contents.json'
  ),
  fileContent
)
