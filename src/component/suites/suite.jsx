import React, {PropTypes} from 'react'
import Properties from './properties'
import Test from './test'

let Suite = ({name, status, properties = {}, tests = []}) => {
  let Props = null
  if (Object.keys(properties).length > 0) Props = <Properties data={properties} />

  return <div className={`card suite is-${status}`}>
    <header className='card-header'>
      <p className='card-header-title'>{name}</p>
      <a className='card-header-icon'>
        <span className='icon'>
          <i className='fa fa-angle-down' />
        </span>
      </a>
    </header>
    <div className='card-content'>
      {Props}
      {tests.map((test, index) => {
        return <Test
          key={`test-${test.name}-${index}`}
          status={test.status}
          name={test.name}
          message={test.message}
          />
      })}
    </div>
  </div>
}

Suite.propTypes = {
  name: PropTypes.string,
  status: PropTypes.string,
  properties: PropTypes.object,
  tests: PropTypes.array
}

export default Suite
