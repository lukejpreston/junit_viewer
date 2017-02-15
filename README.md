# ![Icon](https://raw.githubusercontent.com/lukejpreston/xunit-viewer/react/public/XunitViewerIcon.png)

# Xunit Viewer

**NB** This is the next version of Junit Viewer. Renamed because it supports more than Junit

Also this project used to parse and render. It now uses another project named `Xunit Parser`. It should be the same as the parsing from Xunit Viewer v4

## Usage

### CLI

```bash
xunit-viewer --results=file_or_folder_location --save=file_location.html --port=port_number --minify=false
```

all args are optional

* `results` the location of the test data, will default to current directory
* `save` where you want to save the output, will default to logging the result
* `port` if present will start a server which watches either current directory or the value of `results`
* `minify` will run the code using development mode, which is to say unminified, defaults to true

### Node

```js
const XunitViewer = require('xunit-viewer')

// you pick one of the following
// it will choose suites over xml over file or folder
let rendered = XunitViewer({
  suites: [],
  xml: '<!--XML-->',
  fileOrFolderLocation: ''
})
```

### React

```js
import React from 'react'
import XunitViewer from 'xunit-viewer/component'
import 'xunit-viewer/main.css'

let MyWrapperComponent = () => {
  return <XunitViewer
    suites={[]}
    xml='<!--XML-->'
    />
}
```

### HTML

```html
<html>
  <head>
    <link rel="stylesheet" href="xunit-viewer/main.css" />
    <script type="text/javascript" src="xunit-viewer/main.js" />
  </head>
  <body>
    <input type="file" onchange="renderFile" />
    <textarea onchange="render" />
    <div id='root' />
    <script>
      window.renderFile = (evt) => {
        if (typeof evt.target.files === 'undefined') return
          let file = evt.target.files[0]
          if (!file) return
          let reader = new window.FileReader()
          reader.onload = (evt) => {
            render(evt.target.result)
          }
          reader.onerror = (err) => {
            console.error(err)
          }
          reader.readAsText(file)
      }

      let render = (xml) => {
        try {
          let rendered = XunitViewer.render(xml)
          document.querySelector('#root').appendChild(rendered)
        } catch (err) {
          console.error(err)
        }
      }
    </script>
  </body>
```

## Development

```bash
yarn start # runs `xunit-viewer --results=./src/test-data --port=3000 --minify=false`
yarn test # runs the tests
yarn lint # lints
yarn build # generate the ./dist folder
yarn xunit-viewer # calls ./bin/xunit-viewer
yarn demo # generates the new demo
yarn travis # runs lint => test => demo => publishes demo => publish to npm
```

## Demos

Have a look at our demo
