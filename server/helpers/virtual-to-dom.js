
function toHTML(vTree) {
  if (typeof vTree !== 'object') {
    throw new Error('virtual dom tree isn\'t an object')
  }
  const node = vTree
  return opentag(node) + content(node) + closetag(node)
}

function opentag(node) {
  return `<${node.type} ${attributes(node)}>`
}

function content(node) {
  const {type, props, children} = node

  if (children.length === 1 && typeof children[0] === 'string') {
    // text
    return children[0]
  }
  return children.map(child => {
    if (typeof child.type === 'function') { // component / full template
      const type = child.type
      const component = new type(child.props)
      const el = toHTML(component.preBuild())
      // setTimeout(() => component.mounted(), 0) // fire cb after everything has rendered
      return el
    } else {
      return toHTML(child)
    }
  }).join(' ')

}

function closetag({ type }) {
  return `</${type}>`
}

function attributes({ props }) {
  if (!props) return ''

  let htmlStr = ''
  for (const [key, value] of Object.entries(props)) {
    htmlStr += `${key}="${value}" `
  }
  return htmlStr.trim()
}

module.exports = toHTML
