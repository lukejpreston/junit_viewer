import React, {PropTypes} from 'react'
import 'normalize.css'
import '../../node_modules/bulma/css/bulma.css'
import '../../node_modules/font-awesome/css/font-awesome.css'
import './index.css'

import Header from './header'
import Suites from './suites'
import extractStats from './extract-stats'

class XunitViewer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      header: {
        active: true
      }
    }
  }
  render () {
    return <div>
      <Header
        stats={extractStats(this.props.suites)}
        onToggle={() => {
          this.setState({
            header: {
              active: !this.state.header.active
            }
          })
        }}
        isActive={this.state.header.active}
      />
      <Suites />
    </div>
  }
}

XunitViewer.propTypes = {
  suites: PropTypes.array
}

export default XunitViewer
