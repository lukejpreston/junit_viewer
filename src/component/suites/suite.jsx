import React, {PropTypes} from 'react'

let Suite = ({name, status, properties = {}, tests = []}) => {
  return <div className={`card suite is-${status}`}>
    <header className='card-header'>
      <p className='card-header-title'>{name}</p>
      <a className='card-header-icon'>
        <span className='icon'>
          <i className='fa fa-angle-down' />
        </span>
      </a>
    </header>
    <div className='card-content' />
  </div>
}

Suite.propTypes = {
  name: PropTypes.string,
  status: PropTypes.string,
  properties: PropTypes.object,
  tests: PropTypes.array
}

export default Suite
