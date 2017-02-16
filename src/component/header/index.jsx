import React, {PropTypes} from 'react'
import './header.css'
import Head from './head'
import Body from './body'

let Header = ({suites = [], onToggle, onSearch, isActive, search}) => {
  let active = isActive ? 'active' : 'inactive'
  return <section className='hero'>
    <Head active={active} onToggle={onToggle} />
    <Body suites={suites} active={active} onSearch={onSearch} search={search} />
  </section>
}

Header.propTypes = {
  suites: PropTypes.array,
  isActive: PropTypes.bool,
  onToggle: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  search: PropTypes.object.isRequired
}

export default Header
