import React, {PropTypes} from 'react'
import 'normalize.css'
import '../../node_modules/bulma/css/bulma.css'
import '../../node_modules/font-awesome/css/font-awesome.css'
import './index.css'

import Header from './header'
import Suites from './suites'
import extractStats from './extract-stats'

let XunitViewer = ({suites = []}) => {
  return <div>
    <Header stats={extractStats(suites)} />
    <Suites />
  </div>
}

XunitViewer.propTypes = {
  suites: PropTypes.array
}

export default XunitViewer
