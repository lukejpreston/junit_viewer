import React, {PropTypes} from 'react'
import './header.css'
import Icon from './icon'
import Stat from './stat'
import extractStats from './extract-stats'

let Header = ({suites = [], onToggle, isActive}) => {
  let stats = extractStats(suites)
  let active = isActive ? 'active' : 'inactive'
  return <section className='hero'>
    <div className='hero-head'>
      <header className='nav'>
        <div className='container'>
          <div className='nav-left'>
            <span
              className={`burger is-${active}`}
              onClick={onToggle}>
              <span className='top' />
              <span className='middle' />
              <span className='bottom' />
            </span>
          </div>
          <div className='nav-center'>
            <Icon />
            <h1 className='title'>Xunit Viewer</h1>
          </div>
          <div className='nav-right' />
        </div>
      </header>
    </div>
    <div className={`hero-body is-${active} size-${stats.length}`}>
      <div className='container'>{
          stats.map((row, index) => {
            return <Stat
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

Header.propTypes = {
  suites: PropTypes.array,
  isActive: PropTypes.bool,
  onToggle: PropTypes.func.isRequired
}

export default Header
