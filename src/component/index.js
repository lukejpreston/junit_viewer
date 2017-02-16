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
      },
      search: {
        suites: '',
        tests: '',
        properties: ''
      }
    }
  }
  render () {
    return <div>
      <Header
        suites={this.props.suites}
        search={this.state.search}
        onSearch={(value, type) => {
          let search = this.state.search
          search[type] = value
          this.setState({search})
        }}
        onToggle={() => {
          let header = this.state.header
          header.active = !header.active
          this.setState({header})
        }}
        isActive={this.state.header.active}
      />
      <Suites
        suites={this.props.suites}
        search={this.state.search}
      />
    </div>
  }
}

XunitViewer.propTypes = {
  suites: PropTypes.array
}

export default XunitViewer
