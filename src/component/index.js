import React from 'react'
import 'normalize.css'
import '../../node_modules/bulma/css/bulma.css'
import '../../node_modules/font-awesome/css/font-awesome.css'
import './index.css'

import Header from './header'
import Suites from './suites'

let XunitViewer = () => {
  return <div>
    <Header />
    <Suites />
  </div>
}

export default XunitViewer
