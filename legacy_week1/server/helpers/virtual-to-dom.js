let cbs = []
async function toHTML(vTree, original) {
    if (typeof vTree !== 'object') {
      throw new Error('virtual dom tree isn\'t an object')
    }
    const node = vTree

    if (original) {
      cbs = []
      const inner = await content(node)
      return {html: opentag(node) + inner + closetag(node), cbs}
    }
    const inner = await content(node)
    return opentag(node) + inner + closetag(node)
}

function opentag(node) {
  return `<${node.type} ${attributes(node)}>`
}

async function content(node) {
  const {type, props, children} = node


  if (props === undefined && children.length === 0) {
    // text
    return node.type
  }
  if (children.length === 1 && typeof children[0] === 'string') {
    // text
    return children[0]
  }
  const childnodes = children.map(child => new Promise((resolve, reject) => {
      if (typeof child.type === 'function') { // component / full template
        const type = child.type
        const component = new type(child.props)
        cbs.push(component.onSSR().toString())
        component.serverData()
          .then(data => toHTML(component.preBuild(data)))
          .then(result => resolve(result))
      } else {
        resolve(toHTML(child))
      }
    })
  )
  const result = await Promise.all(childnodes)
  return result.join('')
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
