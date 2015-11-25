Junit Viewer
============

View a folder or a file of junit xml in a simple web page

Demo
====

The demo uses the test data
[Demo](http://lukejpreston.github.io/junit_viewer/)

Install It
==========

```
npm install junit-viewer -g
```

Run It
======

You can start it on as a server
So as not to save the file and share it easily

```
junit-viewer --results=folder_or_file_path --port=9090
```

You can save it to a file

```
junit-viewer --results=folder_or_file_path --save=destination_file.html
```

You can do both

```
junit-viewer --results=folder_or_file_path --save=destination_file.html --port=9090
```

You can use token to show the current date/time in the destination file.
The command below will create `destination_file_2015-11-18.html` file.

```
junit-viewer --results=folder_or_file_path --save=destination_file_$[date].html
```

The string, `date` can be replaced with valid date-format strings.
It uses [date-format](https://www.npmjs.com/package/date-format) plugin.

Test It
=======

If you are working on the code do some tests using the test_data folder

```
junit-viewer --results=test_data --save=destination_file.html --port=9090
```

then view either the saved file or go to localhost:9090 and view your changes
