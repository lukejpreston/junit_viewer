import React, {PropTypes} from 'react'
import 'normalize.css'
import '../../node_modules/bulma/css/bulma.css'
import '../../node_modules/font-awesome/css/font-awesome.css'
import './index.css'

import Header from './header'
import Suites from './suites'

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
        suites={this.props.suites}
        onToggle={() => {
          this.setState({
            header: {
              active: !this.state.header.active
            }
          })
        }}
        isActive={this.state.header.active}
      />
      <Suites suites={this.props.suites} />
    </div>
  }
}

XunitViewer.propTypes = {
  suites: PropTypes.array
}

export default XunitViewer
