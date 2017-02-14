# Xunit Viewer

![Icon](https://raw.githubusercontent.com/lukejpreston/xunit-viewer/react/public/XunitViewerIcon.png)
<img src="https://raw.githubusercontent.com/lukejpreston/xunit-viewer/react/public/XunitViewerIcon.png">

**NB** This is the next version of Junit Viewer. Renamed because it supports more than Junit


## Usage

### CLI

```bash
xunit-viewer --file=location.xml
```

### Node

```js
const XunitViewer = require('xunit-viewer')
let parsedData = XunitViewer.parse('location or xml data')
let rendered = XunitViewer.render(parsedData)
rendered = XunitViewer.render('location or xml data')
```

### React

```js
import React from 'react'
import XunitViewer from 'xunit-viewer/component'
import 'xunit-viewer/standard.css'

let MyWrapperComponent = () => {
  return <XunitViewer data={{}} />
}
```

### HTML

```html
<html>
  <head>
    <link rel="stylesheet" href="xunit-viewer/standard.css" />
    <script type="text/javascript" src="xunit-viewer/main.js" />
  </head>
  <body>
    <input type="file" onchange="renderFile" />
    <div id='root' />
    <script>
      window.renderFile = (evt) => {
        if (typeof evt.target.files === 'undefined') return
          let file = evt.target.files[0]
          if (!file) return
          let reader = new window.FileReader()
          reader.onload = (evt) => {
            let parsedData = XunitViewer.parse(evt.target.result)
            render(parsedData)
          }
          reader.onerror = (err) => {
            console.error(err)
          }
          reader.readAsText(file)
      }

      let render = (data) => {
        let rendered = XunitViewer.render(parsedData)
        document.querySelector('#root').appendChild(rendered)
      }
    </script>
  </body>
```
