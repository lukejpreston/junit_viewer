import React, {PropTypes} from 'react'
import './header.css'
import Icon from './icon'
import Stat from './stat'

let Header = ({stats = [], onToggle, isActive}) => {
  let active = isActive ? 'active' : 'inactive'
  return <section className='hero'>
    <div className='hero-head'>
      <header className='nav'>
        <div className='container'>
          <div className='nav-left'>
            <Icon />
          </div>
          <div className='nav-center'>
            <h1 className='title'>Xunit Viewer</h1>
          </div>
          <div className='nav-right'>
            <span
              className={`is-pulled-right burger is-${active}`}
              onClick={onToggle}>
              <span className='top' />
              <span className='middle' />
              <span className='bottom' />
            </span>
          </div>
        </div>
      </header>
    </div>
    <div className={`hero-body is-${active} size-${stats.length}`}>
      <div className='container'>
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
    </div>
  </section>
}

Header.propTypes = {
  stats: PropTypes.array,
  isActive: PropTypes.boolean,
  onToggle: PropTypes.func.isRequired
}

export default Header
