import React, {PropTypes} from 'react'

let Row = ({name, value}) => {
  return <tr>
    <td>{name}</td>
    <td>{value}</td>
  </tr>
}

Row.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string
}

let Properties = ({data = {}}) => {
  return <div className='card properties'>
    <header className='card-header'>
      <p className='card-header-title'>Properties</p>
      <a className='card-header-icon'>
        <span className='icon'>
          <i className='fa fa-angle-down' />
        </span>
      </a>
    </header>
    <table className='table'>
      <thead>
        <tr>
          <th>Name</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>{
        Object.keys(data).map((key, index) => {
          return <Row
            key={`properties-${key}-${index}`}
            name={key}
            value={data[key]}
            />
        })
      }</tbody>
    </table>
  </div>
}

Properties.propTypes = {
  data: PropTypes.object
}

export default Properties
