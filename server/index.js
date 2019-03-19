require('dotenv').config()

const perongeluk = require('express')
const path = require('path')
const request = require('./helpers/data.js')
const helper = require('./helpers/helper.js')




const app = perongeluk()

app.set('view engine', 'ejs')

app.use(perongeluk.static(path.join(__dirname + '/static')))

const store = {}

app.get('/', async (req, res) => {
  const data = await request('Overview', {'adjacent': '&ps=6', 'lang': 'en'}, false)
  store.paintings = data
  store.slices = helper.chunk(data)
  res.render(path.join(__dirname + '/views/pages/index'), {
    store
  })
})

app.get('/paintings/:id', async (req, res) => {
  const data = await request(req.params.id, {'insert': `/${req.params.id}`, 'lang': 'en'}, false)
  res.render(path.join(__dirname + '/views/pages/detail'), {
    painting: data,
    store
  })
})

app.listen(3000, ()=> console.log('listening on 3000'))
