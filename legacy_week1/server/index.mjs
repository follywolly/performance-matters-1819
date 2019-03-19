import express from 'express'
import toHTML from './helpers/virtual-to-dom'
import fs from 'fs'
import path from 'path'
import App from '../browser/js/app.mjs'
import Overview from '../browser/js/templates/pages/overview.mjs'
import Detail from '../browser/js/templates/pages/detail.mjs'
import store from '../browser/js/store.mjs'

const __dirname = path.resolve(path.dirname(''))


const app = express()

app.use(express.static(path.join(__dirname + '/static')))

const render = async (req, res, template, param) => {
  const root = new App
  const temp = new template({id: param})

  const body = await toHTML(root.preBuild(), true)
  const parts = body.html.split('router-view')
  const head = parts[0]
  const tail = parts[1].trim().substring(2)

  const inner = await toHTML(temp.preBuild(), true)

  const doc = `${head}router-view">${inner.html}${tail}`

  const cbs = inner.cbs
    .filter(cb => cb !== 'undefined')
    .map(cb => {
      const index = cb.indexOf(')')
      const tail = `(that => ${cb.slice(index + 1).trim().replace('this', 'that')})(window);`
      return tail
    })
    .join('')
    .trim()

  const initState = store.state ? JSON.stringify(store.state) : 'undefined'

  res.set('Content-Type', 'text/html');
  res.end(`
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Paintings</title>
        <link rel="stylesheet" href="/css/styles.css">
      </head>
      <body>
        <div id="root">
          ${doc}
        </div>
        <script>
          window._SERVER_STATE_ = ${initState}
        </script>
        <script type="module">
          ${cbs}
        </script>
        <script type="module" src="/js/index.js"></script>
      </body>
    </html>`)
}

app.get('/', (req, res) => {
  render(req, res, Overview)
})
app.get('/paintings/:id', (req, res) => {
  render(req, res, Detail, req.params.id)
})

app.listen(3000, ()=> console.log('listening on 3000'))
