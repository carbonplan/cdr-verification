const fs = require('fs')
const glob = require('glob')

const pathwayContent = glob
  .sync('./data/**/+([0-9]).+([0-9]).json')
  .reduce((pathwayVersions, pathwayPath) => {
    const [pathway] = pathwayPath.match(/[^/]+(?=\/[^/]+\.json)/)
    const [version] = pathwayPath.match(/[^/]+(?=\.json)/)

    const source = fs.readFileSync(pathwayPath)
    const content = JSON.parse(source)

    let versions = pathwayVersions.find((p) => p[0] === pathway)
    if (versions) {
      versions[1].push({ version, content })
    } else {
      pathwayVersions.push([pathway, [{ version, content }]])
    }

    return pathwayVersions
  }, [])

const pathways = pathwayContent.reduce((accum, [pathway, versions]) => {
  const latestVersion = versions.sort(
    (a, b) => Number(b.version) - Number(a.version)
  )[0].content
  accum.push(latestVersion)
  return accum
}, [])

const pathwayVersions = pathwayContent.reduce((accum, [pathway, versions]) => {
  accum[pathway] = versions.reduce((accum, { version, content }) => {
    accum[version] = content
    return accum
  }, {})
  return accum
}, {})

module.exports = {
  pathwayVersions,
  pathways,
}
