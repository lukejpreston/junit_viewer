Junit Viewer
============

View a folder or a file of junit xml in a simple web page

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
