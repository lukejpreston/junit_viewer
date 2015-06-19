Junit Viewer
============

View a folder of junit xml in a simple web page

install it

```
npm install junit-viewer -g
```

Run It
======

You can start it on as a server
So as not to save the file and share it easily

```
junit-viewer --folder=foldername --port=9090
```

You can save it to a file

```
junit-viewer --folder=foldername --save=destination_file.html
```

You can do both

```
junit-viewer --folder=foldername --save=destination_file.html --port=9090
```