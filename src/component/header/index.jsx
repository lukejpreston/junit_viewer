import React, {PropTypes} from 'react'
import './header.css'
import Head from './head'
import Body from './body'

let Header = ({suites = [], onToggle, isActive}) => {
  let active = isActive ? 'active' : 'inactive'
  return <section className='hero'>
    <Head active={active} onToggle={onToggle} />
    <Body suites={suites} active={active} />
  </section>
}

Header.propTypes = {
  suites: PropTypes.array,
  isActive: PropTypes.bool,
  onToggle: PropTypes.func.isRequired
}

export default Header
