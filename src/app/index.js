// this an example app, used for testing primarly

import React from 'react'
import ReactDOM from 'react-dom'
import XunitViewer from '../component'
import uuid from 'uuid/v4'

let suites = [{
  _uuid: uuid(),
  status: 'pass',
  name: 'Passing Suite',
  properties: {
    _uuid: uuid(),
    key: 'value'
  },
  tests: [{
    _uuid: uuid(),
    status: 'pass',
    name: 'pass',
    message: 'passing test'
  }, {
    _uuid: uuid(),
    status: 'fail',
    name: 'fail',
    message: 'failing test'
  }, {
    _uuid: uuid(),
    status: 'error',
    name: 'error',
    message: 'erroring test'
  }, {
    _uuid: uuid(),
    status: 'skipped',
    name: 'skip',
    message: 'skipping test'
  }, {
    _uuid: uuid(),
    status: 'blah',
    name: 'unknown',
    message: 'unknown test'
  }]
}, {
  _uuid: uuid(),
  status: 'fail',
  name: 'Failing Suite',
  properties: {
    _uuid: uuid(),
    key: 'value'
  },
  tests: [{
    _uuid: uuid(),
    status: 'pass',
    name: 'pass',
    message: 'passing test'
  }, {
    _uuid: uuid(),
    status: 'fail',
    name: 'fail',
    message: 'failing test'
  }]
}]

ReactDOM.render(
  <XunitViewer suites={suites} />,
  document.getElementById('root')
)
