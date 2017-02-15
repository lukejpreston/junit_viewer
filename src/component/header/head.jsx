import React, {PropTypes} from 'react'
import Icon from './icon'

let Head = ({active, onToggle}) => {
  return <div className='hero-head'>
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
}

Head.propTypes = {
  active: PropTypes.string,
  onToggle: PropTypes.func
}

export default Head
