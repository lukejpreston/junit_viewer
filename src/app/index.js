// this an example app, used for testing primarly

import React from 'react'
import ReactDOM from 'react-dom'
import XunitViewer from '../component'

let suites = [{
  status: 'pass',
  name: 'Passing Suite',
  properties: {
    key: 'value'
  },
  tests: [{
    status: 'pass',
    name: 'pass',
    message: 'passing test'
  }, {
    status: 'fail',
    name: 'fail',
    message: 'failing test'
  }, {
    status: 'error',
    name: 'error',
    message: 'erroring test'
  }, {
    status: 'skipped',
    name: 'skip',
    message: 'skipping test'
  }, {
    status: 'unknown',
    name: 'unknown',
    message: 'unknown test'
  }]
}, {
  status: 'fail',
  name: 'Failing Suite',
  properties: {
    key: 'value'
  },
  tests: [{
    status: 'pass',
    name: 'pass',
    message: 'passing test'
  }, {
    status: 'fail',
    name: 'fail',
    message: 'failing test'
  }]
}]

ReactDOM.render(
  <XunitViewer suites={suites} />,
  document.getElementById('root')
)
