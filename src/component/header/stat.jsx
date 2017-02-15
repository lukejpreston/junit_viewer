import React, {PropTypes} from 'react'

let Toggle = ({icon, name, total, active, type}) => {
  let isActive = active ? 'is-active' : 'is-inactive'
  return <li className={`toggle ${isActive} is-${type}`}>
    <a>
      <span className='icon is-small'><i className={`fa fa-${icon}`} /></span>
      <span>{name} <b>{total}</b></span>
    </a>
  </li>
}

Toggle.propTypes = {
  icon: PropTypes.string,
  name: PropTypes.string,
  total: PropTypes.number,
  active: PropTypes.bool,
  type: PropTypes.string
}

let Stat = ({icon, name, total, active, type, data = []}) => {
  return <div className='subtitle'>
    <div className='tabs is-toggle'>
      <ul>
        <li>
          <p className='control has-icon has-icon-right'>
            <input className='input' type='text' placeholder={`Search ${name}`} />
            <span className='icon is-small'>
              <i className='fa fa-search' />
            </span>
          </p>
        </li>
        <Toggle
          icon={icon}
          name={name}
          total={total}
          active={active}
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
  active: PropTypes.bool,
  type: PropTypes.string
}

export default Stat
