// this is the interface to the project
const render = require('./render')
const parse = require('./parse')

module.exports = {
  parse (file) {
    return parse.file(file)
  },
  parseXml (xml) {
    return parse.xml(xml)
  },
  render (data) {
    return render.data(data)
  },
  parseAndRender (file) {
    return render.file(file)
  },
  parseXmlAndRender (xml) {
    return render.xml(xml)
  }
}
