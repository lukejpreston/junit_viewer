import React, {PropTypes} from 'react'
import './header.css'
import Head from './head'
import Body from './body'

let Header = ({suites = [], onToggle, onStatToggle, onSearch, isActive, search, statsStatus}) => {
  let active = isActive ? 'active' : 'inactive'
  return <section className='hero'>
    <Head
      active={active}
      onToggle={onToggle} />
    <Body
      statsStatus={statsStatus}
      suites={suites}
      active={active}
      onSearch={onSearch}
      onStatToggle={onStatToggle}
      search={search} />
  </section>
}

Header.propTypes = {
  suites: PropTypes.array,
  isActive: PropTypes.bool,
  onToggle: PropTypes.func.isRequired,
  onStatToggle: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  search: PropTypes.object.isRequired,
  statsStatus: PropTypes.object
}

export default Header
