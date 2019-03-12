import express from 'express'
import toHTML from './helpers/virtual-to-dom'
import fs from 'fs'
import path from 'path'
const __dirname = path.resolve(path.dirname(''))
console.log('dirname', __dirname)


import App from '../browser/js/app.mjs'


const app = express()

app.use(express.static(path.join(__dirname + '/static')))

app.get('/', (req, res) => {
  // turn the js into html and send it
  const template = new App
  const doc = toHTML(template.preBuild())

  res.set('Content-Type', 'text/html');
  res.end(`
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Dictionary</title>
        <link rel="stylesheet" href="/css/styles.css">
      </head>
      <body>
        <div id="root">
          ${doc}
        </div>
        <script type="module" src="/js/index.js"></script>
      </body>
    </html>`)
})

app.listen(3000, ()=> console.log('listening on 3000'))
