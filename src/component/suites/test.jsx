import React, {PropTypes} from 'react'

let Test = ({status, name, message}) => {
  return <div className={`card test is-${status}`}>
    <header className='card-header'>
      <p className='card-header-title'>{name}</p>
      <a className='card-header-icon'>
        <span className='icon'>
          <i className='fa fa-angle-down' />
        </span>
      </a>
    </header>
    <div className='card-content'>{message}</div>
  </div>
}

Test.propTypes = {
  status: PropTypes.string,
  name: PropTypes.string,
  message: PropTypes.any
}

export default Test
