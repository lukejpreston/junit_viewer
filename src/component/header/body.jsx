import React, {PropTypes} from 'react'
import Stat from './stat'
import extractStats from './extract-stats'

let Body = ({active, suites}) => {
  let stats = extractStats(suites)
  return <div className={`hero-body is-${active} size-${stats.length}`}>
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
}

Body.propTypes = {
  active: PropTypes.string,
  suites: PropTypes.array
}

export default Body
