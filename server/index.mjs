import express from 'express'
import toHTML from './helpers/virtual-to-dom'
import fs from 'fs'
import path from 'path'
import App from '../browser/js/app.mjs'
import Overview from '../browser/js/templates/pages/overview.mjs'
import Detail from '../browser/js/templates/pages/detail.mjs'

const __dirname = path.resolve(path.dirname(''))


const app = express()

app.use(express.static(path.join(__dirname + '/static')))

const render = async (req, res, template, param) => {
  const root = new App
  const temp = new template({id: param})

  const body = await toHTML(root.preBuild())
  console.log(body)

  const parts = body.split('router-view')
  const head = parts[0]
  const tail = parts[1]

  const inner = await toHTML(temp.preBuild())
  const doc = `${head}router-view">${inner}${tail}`

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
        <script type="module" src="/js/index.js"></script>
      </body>
    </html>`)
}

app.get('/', (req, res) => {
  console.log(req.params)

  render(req, res, Overview)
})
app.get('/paintings/:id', (req, res) => {
  render(req, res, Detail, req.params.id)
})

app.listen(3000, ()=> console.log('listening on 3000'))
