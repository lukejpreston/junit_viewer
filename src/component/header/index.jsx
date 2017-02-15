import React, {PropTypes} from 'react'
import './header.css'
import Stat from './stat'

let Header = ({stats = []}) => {
  return <section className='hero is-info is-bold'>
    <div className='hero-body'>
      <div className='container'>
        <h1 className='title'>Xunit Viewer</h1>
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
  stats: PropTypes.array
}

export default Header
