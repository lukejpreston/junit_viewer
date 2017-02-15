// this an example app, used for testing primarly

import React from 'react'
import ReactDOM from 'react-dom'
import XunitViewer from '../component'

let suites = [{
  status: 'pass',
  properties: {
    key: 'value'
  },
  tests: [{
    status: 'pass'
  }, {
    status: 'fail'
  }, {
    status: 'error'
  }, {
    status: 'skipped'
  }, {
    status: 'broken'
  }]
}, {
  status: 'fail',
  properties: {
    key: 'value'
  },
  tests: [{
    status: 'pass'
  }, {
    status: 'fail'
  }]
}]

ReactDOM.render(
  <XunitViewer suites={suites} />,
  document.getElementById('root')
)
