import React from 'react'
import 'normalize.css'
import '../../node_modules/bulma/css/bulma.css'
import '../../node_modules/font-awesome/css/font-awesome.css'
import './index.css'

import Header from './header'
import Suites from './suites'

// const rows = [{
//   name: 'Suites',
//   total: 100,
//   active: false,
//   type: 'suites',
//   icon: 'plus',
//   data: [{
//     total: 50,
//     active: false,
//     type: 'pass',
//     icon: 'check'
//   }, {
//     total: 50,
//     active: false,
//     type: 'fail',
//     icon: 'times'
//   }]
// }, {
//   name: 'Tests',
//   total: 100,
//   active: true,
//   type: 'tests',
//   icon: 'minus',
//   data: [{
//     total: 25,
//     active: true,
//     type: 'pass',
//     icon: 'check'
//   }, {
//     total: 25,
//     active: true,
//     type: 'fail',
//     icon: 'times'
//   }, {
//     total: 25,
//     active: true,
//     type: 'error',
//     icon: 'exclamation'
//   }, {
//     total: 25,
//     active: true,
//     type: 'skipped',
//     icon: 'ban'
//   }]
// }, {
//   name: 'Properties',
//   total: 100,
//   active: true,
//   type: 'properties',
//   icon: 'minus'
// }]

let XunitViewer = () => {
  return <div>
    <Header />
    <Suites />
  </div>
}

export default XunitViewer
