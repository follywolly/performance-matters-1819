const fetch = require('node-fetch')

const settings = `?key=${process.env.API_KEY}&format=json`
const endpoint = 'https://www.rijksmuseum.nl/api/'

const url = (params = {}) => {
  params.insert = params.insert || ''
  params.adjacent = params.adjacent || ''
  return `${endpoint}${params.lang}/collection${params.insert}${settings}${params.adjacent}`
}
const cleanObj = obj => {
  for (const [key, val] of Object.entries(obj)) {
    obj[key] = !val ? '' : val
  }
  return obj
}
const detailTemp = painting => {
  return {
    number: painting.objectNumber,
    src: painting.webImage.url,
    fullTitle: painting.fullTitle,
    title: painting.title,
    maker: painting.principalOrFirstMaker,
    colors: painting.colors,
    description: painting.label.description,
    makerLine: painting.label.makerLine
  }
}
const overviewTemp = painting => {
  return {
    number: painting.objectNumber,
    headerSrc: painting.headerImage.url,
    fullTitle: painting.fullTitle,
    title: painting.title,
    maker: painting.principalOrFirstMaker
  }
}
const format = data => {
  if (data.artObject) {
    // single painting
    const painting = data.artObject
    return cleanObj(detailTemp(painting))
  }
  // all paintings
  return data.artObjects.map(painting => cleanObj(overviewTemp(painting)))
}
const request = (name, urlConfig, getFromLocal = true) => {
  const reqUrl = url(urlConfig)
  return new Promise((resolve, reject) => {
    fetch(reqUrl)
      .then(raw => raw.json())
      .then(json => format(json))
      .then(data => resolve(data))
      .catch(err => reject(err))
  })
}
module.exports = request
