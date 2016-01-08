Junit Viewer
============

[![Join the chat at https://gitter.im/lukejpreston/junit_viewer](https://badges.gitter.im/lukejpreston/junit_viewer.svg)](https://gitter.im/lukejpreston/junit_viewer?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[![Build Status](https://travis-ci.org/lukejpreston/junit_viewer.svg?branch=master)](https://travis-ci.org/lukejpreston/junit_viewer)

Junit Viewer is a very simple yet powerful way of viewing your xunit results

Features
========


**Reads a file or folder (and all sub folders) of XML results** Hence you don't need to run this on separate files

**Has it's own API** Now you can embed it in your own test runners in order to save the results in a quick and nice viewer

**Single Page Results** You don't need to have a whole folder of files in order to view your results (trke all other junit viewers)

**Using Express to start a server** Means you can just hit refresh and you have your latest tests instead of re-running Junit Viewer

**Search** It comes with a search box so you can search your suites and tests and test messages but also properties

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
junit_viewer --results=file_or_folder_location
```

If you want to save it to a file

```
junit_viewer --results=file_or_folder_location --save=file_location.html
```

If you want to start a server

```
junit_viewer --results=file_or_folder_location --port=port_number
```

Using the API
=============

```
npm install --save-dev junit_viewer
```

```
var jv = require('junit_viewer')
var parsedData = jv.parse('fileOrFolderLocation')
var renderedData = jv.render(parsedData)
var parsedAndRenderedData = jv.junit_viewer('fileOrFolderLocation')
```

Demos
=====

* [A mix of all kinds of data](http://lukejpreston.github.io/junit_viewer/demos/data.html)
* [An example of a single file](http://lukejpreston.github.io/junit_viewer/demos/single.html)

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