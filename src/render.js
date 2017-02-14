import React from 'react'
import ReactDOMServer from 'react-dom/server'
import './index.css'
import XunitViewer from './xunit-viewer/component'

ReactDOMServer.renderToString(<XunitViewer />)
