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
        active: true,
        statsStatus: {}
      },
      search: {
        suites: '',
        tests: '',
        properties: ''
      },
      collapsed: {
        suites: {},
        tests: {},
        properties: {}
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
        onStatToggle={({name, type}) => {
          let statsStatus = this.state.header.statsStatus
          statsStatus[name] = statsStatus[name] || {}
          if (statsStatus[name][type]) delete statsStatus[name][type]
          else statsStatus[name][type] = true
          this.setState({
            header: {
              active: this.state.header.active,
              statsStatus
            }
          })
        }}
        isActive={this.state.header.active}
        statsStatus={this.state.header.statsStatus}
      />
      <Suites
        suites={this.props.suites}
        search={this.state.search}
        collapsed={this.state.collapsed}
        onToggle={({type, uuid}) => {
          let collapsed = this.state.collapsed
          if (collapsed[type][uuid]) delete collapsed[type][uuid]
          else collapsed[type][uuid] = true
          this.setState({collapsed})
        }}
      />
    </div>
  }
}

XunitViewer.propTypes = {
  suites: PropTypes.array
}

export default XunitViewer
