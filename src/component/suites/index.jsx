import React, {PropTypes} from 'react'
import './suites.css'
import Suite from './suite'
import searchSuites from '../search-suites'

let Suites = ({suites = [], search, collapsed, onToggle}) => {
  suites = searchSuites(suites, search)
  return <section className='section suites'>
    <div className='container'>{
        suites.map(suite => <Suite
          collapsed={collapsed}
          uuid={suite._uuid}
          onToggle={onToggle}
          key={`suite-${suite._uuid}`}
          name={suite.name}
          status={suite.status}
          properties={suite.properties}
          tests={suite.tests}
          />
        )
      }</div>
  </section>
}

Suites.propTypes = {
  suites: PropTypes.array,
  search: PropTypes.object.isRequired,
  collapsed: PropTypes.object.isRequired,
  onToggle: PropTypes.func.isRequired
}

export default Suites
