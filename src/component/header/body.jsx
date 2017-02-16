import React, {PropTypes} from 'react'
import Stat from './stat'
import extractStats from './extract-stats'

let Body = ({active, suites, onSearch, search}) => {
  let stats = extractStats(suites, search)
  return <div className={`hero-body is-${active} size-${stats.length}`}>
    <div className='container'>{
      stats.map((stat, index) => {
        return <Stat
          onSearch={onSearch}
          key={`stat-${stat.type}-${index}`}
          name={stat.name}
          total={stat.total}
          active={stat.active}
          type={stat.type}
          icon={stat.icon}
          data={stat.data}
          />
      })
  }</div>
  </div>
}

Body.propTypes = {
  active: PropTypes.string,
  suites: PropTypes.array,
  onSearch: PropTypes.func.isRequired,
  search: PropTypes.object.isRequired
}

export default Body
