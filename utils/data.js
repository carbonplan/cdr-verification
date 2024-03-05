const fs = require('fs')
const glob = require('glob')

const pathwayVersions = glob
  .sync('./data/**/+([0-9]).+([0-9]).json')
  .reduce((pathways, pathwayPath) => {
    const [pathway] = pathwayPath.match(/[^/]+(?=\/[^/]+\.json)/)
    const [version] = pathwayPath.match(/[^/]+(?=\.json)/)

    const source = fs.readFileSync(pathwayPath)
    const content = JSON.parse(source)

    let versions = pathways.find((p) => p[0] === pathway)
    if (versions) {
      versions[1].push({ version, content })
    } else {
      pathways.push([pathway, [{ version, content }]])
    }

    return pathways
  }, [])

const pathways = pathwayVersions.reduce((accum, [pathway, versions]) => {
  const latestVersion = versions.sort(
    (a, b) => Number(b.version) - Number(a.version)
  )[0].content
  accum.push(latestVersion)
  return accum
}, [])

const ID_MAPPING = pathwayVersions.reduce((accum, [pathway, versions]) => {
  const latestVersion = versions.sort(
    (a, b) => Number(b.version) - Number(a.version)
  )[0].content

  accum[pathway] = latestVersion.pathway_id
  return accum
}, {})

const pathwayContent = pathwayVersions.reduce((accum, [pathway, versions]) => {
  const versionInfo = versions.reduce((v, { version, content }) => {
    v[version] = content
    return v
  }, {})

  const metadataPath = `./data/${pathway}/metadata.json` // glob.sync(`./data/${pathway}/metadata.json`)
  const source = fs.readFileSync(metadataPath)
  const metadata = JSON.parse(source)

  accum[ID_MAPPING[pathway]] = {
    ...versionInfo,
    metadata,
  }

  return accum
}, {})

module.exports = {
  ID_MAPPING,
  pathwayContent,
  pathways,
}
