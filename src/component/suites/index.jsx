import React, {PropTypes} from 'react'
import './suites.css'
import Suite from './suite'

let Suites = ({suites = []}) => {
  return <section className='section suites'>
    <div className='container'>{
        suites.map((suite, index) => {
          return <Suite
            key={`suite-${index}`}
            name={suite.name}
            status={suite.status}
            properties={suite.properties}
            tests={suite.tests}
            />
        })
      }</div>
  </section>
}

Suites.propTypes = {
  suites: PropTypes.array
}

export default Suites
