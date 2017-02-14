import React from 'react'
import './header.css'
import Row from './row'

const rows = [{
  name: 'Suites',
  total: 100,
  active: false,
  type: 'suites',
  icon: 'plus',
  data: [{
    total: 50,
    active: false,
    type: 'pass',
    icon: 'check'
  }, {
    total: 50,
    active: false,
    type: 'fail',
    icon: 'times'
  }]
}, {
  name: 'Tests',
  total: 100,
  active: true,
  type: 'tests',
  icon: 'minus',
  data: [{
    total: 25,
    active: true,
    type: 'pass',
    icon: 'check'
  }, {
    total: 25,
    active: true,
    type: 'fail',
    icon: 'times'
  }, {
    total: 25,
    active: true,
    type: 'error',
    icon: 'exclamation'
  }, {
    total: 25,
    active: true,
    type: 'skipped',
    icon: 'ban'
  }]
}, {
  name: 'Properties',
  total: 100,
  active: true,
  type: 'properties',
  icon: 'minus'
}]

let Header = () => {
  return <section className='hero is-info is-bold'>
    <div className='hero-body'>
      <h1 className='title'>Xunit Viewer</h1>
      <div className='container'>{
          rows.map((row, index) => {
            return <Row
              key={`row-${index}`}
              name={row.name}
              total={row.total}
              active={row.active}
              type={row.type}
              icon={row.icon}
              data={row.data}
              />
          })
      }</div>
    </div>
  </section>
}

export default Header
