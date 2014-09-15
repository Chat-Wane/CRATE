CRATE
=====

<i>CRATE is a real-time distributed CollaboRATive Editor. This project aims to
provide a peer-to-peer editing tool to get rid of service
providers. Eventually, it will provide all the convenient functionalities of
common editors.</i>

Try it out
----------

You can download and try the application for your OS:
[Windows](https://dl.dropboxusercontent.com/u/21159323/sandedit-win.zip),
[MacOSX](https://dl.dropboxusercontent.com/u/21159323/crate-osx.zip). These
are temporary (or at least, won't be supported on the main track) since we plan
to make a browser-only editor.

<ol>
  <li>Unzip and execute the crate file.</li>
  <li>Fill the first field with your local IP and Port.</li>
  <li>Fill the second field with the mask corresponding to the local IP.</li>
  <li>Fill the third field with the address of a know peer.</li>
  <li>Write ;)</li>
</ol>

How to build
------------

First, CRATE requires to install some dependencies.
```
npm install netmask smokesignal causaltrack lseqarray
```

Second, CRATE uses node-webkit to bundle the sources into a working
application. You can download it at [node-webkit
download](https://github.com/rogerwang/node-webkit#download) . Then, the steps
to create the application can be found
[here](https://github.com/rogerwang/node-webkit/wiki/How-to-package-and-distribute-your-apps).

Project Goal
------------

Ultimately, the goal of this project is to provide a real-time distributed
collaborative editor using peer-to-peer. Recent developments have allowed the
use of peer-to-peer directly within the browser thanks to
[webRTC](http://www.webrtc.org). It is the natural path to follow since it
makes everything easier for the user (i.e. nothing to install). In the same
spirit, we want that the user can connect and contribute to a document in one
click (e.g. only by following a link) in a bittorent fashion.
