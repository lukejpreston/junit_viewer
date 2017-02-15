import React, {PropTypes} from 'react'

import iconMap from '../icon-map'

let knownStatuses = [
  'pass',
  'fail',
  'error',
  'skipped'
]

let Test = ({status, name, message}) => {
  status = knownStatuses.includes(status) ? status : 'unknown'
  let Content = null
  let Icon = null
  if (message) {
    Content = <div className='card-content'>{message}</div>
    Icon = <a className='card-header-icon'>
      <span className='icon'>
        <i className='fa fa-angle-down' />
      </span>
    </a>
  }

  return <div className='card test'>
    <header className={`card-header is-${status}`}>

      <p className='card-header-title'>
        <i className={`fa fa-${iconMap[status]}`} />
        {name}
      </p>
      {Icon}
    </header>
    {Content}
  </div>
}

Test.propTypes = {
  status: PropTypes.string,
  name: PropTypes.string,
  message: PropTypes.any
}

export default Test
