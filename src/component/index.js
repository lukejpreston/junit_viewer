import React from 'react'
import 'normalize.css'
import '../../node_modules/bulma/css/bulma.css'
import '../../node_modules/font-awesome/css/font-awesome.css'
import './index.css'

import Header from './header'
import Main from './main'

let XunitViewer = () => {
  return <div>
    <Header />
    <Main />
  </div>
}

export default XunitViewer
