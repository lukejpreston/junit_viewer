Junit Viewer
============

[![npm version](https://badge.fury.io/js/junit-viewer.svg)](https://badge.fury.io/js/junit-viewer)
[![Join the chat at https://gitter.im/lukejpreston/junit_viewer](https://badges.gitter.im/lukejpreston/junit_viewer.svg)](https://gitter.im/lukejpreston/junit_viewer?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Build Status](https://travis-ci.org/lukejpreston/junit_viewer.svg?branch=master)](https://travis-ci.org/lukejpreston/junit_viewer)
[![Dependency Status](https://www.versioneye.com/user/projects/5695f33caf789b002e000662/badge.svg)](https://www.versioneye.com/user/projects/5695f33caf789b002e000662)
[![Downloads on npm](http://img.shields.io/npm/dm/junit-viewer.svg)](https://www.npmjs.com/package/junit-viewer)

Junit Viewer is a very simple yet powerful way of viewing your xunit results

Features
========

**Reads a file or folder (and all sub folders) of XML results** Hence you don't need to run this on separate files

**Has it's own API** Now you can embed it in your own test runners in order to save the results in a quick and nice viewer

**Single Page Results** You don't need to have a whole folder of files in order to view your results (trke all other junit viewers)

**Shows HTML output** This tool will show HTML in your test messages, meaning it is a great test snapshot tool to show images

**Using Express to start a server** Means you can just hit refresh and you have your latest tests instead of re-running Junit Viewer

**Search** It comes with a search box so you can search your suites and tests and test messages but also properties, it uses matching similar to Sublime e.g 'HW' would match against 'HelloWorld' (so would 'hw') and you can also search using regex e.g. 'h(.*)' would match against 'HelloWorld' or you can use a glob search e.g. '*world' would match against 'hello world'

**Skeleton** It uses Skeleton so it is pretty, responsive and quick

**Quick** It uses mustache and has no jquery as such it is quicker than any other junit test viewer

**Independent** It is independent of any testing tool, so it can work with anything which can produce junit results


Install It
==========

```
npm install junit-viewer -g
```

[Find the project on NPM](https://www.npmjs.com/package/junit-viewer)

Run It
======

If you just want to log to the terminal

```
junit-viewer --results=file_or_folder_location
```

By default it will just set the results folder to the current directory so you could just run

```
junit-viewer
```

If you want to save it to a file

```
junit-viewer --results=file_or_folder_location --save=file_location.html
```

If you want to start a server

```
junit-viewer --results=file_or_folder_location --port=port_number
```

By default it is minified but if you don't want it minified

```
junit-viewer --results=file_or_folder_location --minify=false
```

Using the API
=============

```
npm install --save-dev junit-viewer
```

```
var jv = require('junit-viewer')
var parsedData = jv.parse('fileOrFolderLocation')
// var parsedData = jv.parseXML('xml data')
var renderedData = jv.render(parsedData)
var parsedAndRenderedData = jv.junit_viewer('fileOrFolderLocation')
```

Code Documentation
==================

Using Junit Viewer's very own unit tests (using a single file result)

[Junit Viewer](http://lukejpreston.github.io/junit_viewer/junit_viewer_specs.html)

Demos
=====

Using Junit Viewer's very own unit tests (using a folder of results)

[A mix of all kinds of tests](http://lukejpreston.github.io/junit_viewer/demo.html)

Contributions
=============

If you wish to contribute then you can either create an issue or fork it and create a PR

When developing all you need to do is

```
npm i
```

And to run the tests

```
npm test
```

The testing strategy is an integration test and not a conventional unit test
