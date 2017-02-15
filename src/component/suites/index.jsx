import React, {PropTypes} from 'react'
import './suites.css'
import Suite from './suite'

let Suites = ({suites = []}) => {
  return <section className='section suites'>
    <div className='container'>
      <Suite />
    </div>
  </section>
}

Suites.propTypes = {
  suites: PropTypes.array
}

export default Suites
