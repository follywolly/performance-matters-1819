'use strict'

// modules
import Router from './modules/router.mjs'

import Detail from './templates/pages/detail.mjs'
import Overview from './templates/pages/overview.mjs'

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
