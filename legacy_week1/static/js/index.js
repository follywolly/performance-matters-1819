'use strict'

// modules
import store from './store.js'
import Router from './modules/router.js'

import Detail from './templates/pages/detail.js'
import Overview from './templates/pages/overview.js'

const router = new Router(
  [
    {
      href: '/',
      temp: () => new Overview,
      callback: () => console.log('callback')
    },
    {
      href: '/paintings/:id',
      temp: (id) => new Detail({id}),
      callback: [
        () => console.log('callback 1'),
        () => console.log('callback 2')
      ]
    }
  ]
)

// router.add(
//   [
//     {
//       href: '/',
//       temp: () => new Overview,
//       callback: () => console.log('callback')
//     },
//     {
//       href: '/paintings/:id',
//       temp: (id) => new Detail({id}),
//       callback: [
//         () => console.log('callback 1'),
//         () => console.log('callback 2')
//       ]
//     }
//   ]
// )

// router.navigate()
