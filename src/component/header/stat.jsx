import React, {PropTypes} from 'react'

let Toggle = ({icon, name, total, type}) => {
  return <li className={`toggle is-${type}`}>
    <a className='count'>
      <span className='icon is-small'><i className={`fa fa-${icon}`} /></span>
      <span>{name} <b>{total}</b></span>
    </a>
  </li>
}

Toggle.propTypes = {
  icon: PropTypes.string,
  name: PropTypes.string,
  total: PropTypes.number,
  type: PropTypes.string
}

let Stat = ({icon, name, total, type, data = [], onSearch}) => {
  return <div className='subtitle'>
    <div className='tabs is-toggle'>
      <ul>
        <li>
          <p className='control has-icon has-icon-right'>
            <input
              className='input'
              type='text'
              placeholder={`Search ${name}`}
              onChange={evt => {
                onSearch(evt.target.value, type)
              }} />
            <span className='icon is-small'>
              <i className='fa fa-search' />
            </span>
          </p>
        </li>
        <Toggle
          icon={icon}
          name={name}
          total={total}
          type={type} />
        {
          data.map((toggle, index) => {
            return <Toggle
              key={`toggle-${type}-${index}`}
              icon={toggle.icon}
              name={toggle.name}
              total={toggle.total}
              active={toggle.active}
              type={toggle.type} />
          })
        }
      </ul>
    </div>
  </div>
}

Stat.propTypes = {
  icon: PropTypes.string,
  name: PropTypes.string,
  total: PropTypes.number,
  data: PropTypes.array,
  type: PropTypes.string,
  onSearch: PropTypes.func.isRequired
}

export default Stat
