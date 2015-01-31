#CRATE

<i>Keywords: distributed editor, decentralized, confict-free replicated data
type (CRDT), WebRTC-based gossiping.</i>

CRATE is a real-time distributed CollaboRATive Editor running directly
within your browser. Eventually, it will provide all the convenient
functionalities of common editors.
One of the major interest of this editor is based in the fact that it does not
rely on any central server. It alleviates some topology-specific issues
(e.g. ownership, economic intelligence, scalability in number of users,
availability, limitations in term of service etc.). Knowingly, users entirely
control their own documents and decide to whom they share them. Each author
holds a replica of the document locally, hence, is able to edit offline.

CRATE is still in its very early stage of development. Therefore, the
application may be buggy. Also, even basic functionalities are not
implemented yet. Feel free to request functionalities, report the issues,
and ask your questions at this
[link](https://github.com/Chat-Wane/CRATE/issues).

##Usage

The editor is accessible [here](http://chat-wane.github.io/CRATE). Make sure
that your browser supports [WebRTC](http://www.webrtc.org) (e.g. Chrome).
You can immediately start editing. Then, to extend the authoring to your
collaborators, there are two ways described in this section.

The globe inside the header gives information about the state of the connection
, i.e., whether you are connected (green), partially connected (yellow), or
disconnected (red, or white). If the globe does not change its colour after
the procedure below, it means that there might be some issues with establishing
a WebRTC connection. 

###Share

To share a document, click on the button "Share" inside the header of the
page. A link will appear at the bottom of the page. Give it to your
collaborator. Soon, the latter should be connected to you. Repeat the process
for each collaborator.

###Join

To join an editing session, it is more complicated (for now):
<ol>
  <li>Click on the dropdown part of the button "Share". Then,
  "Get an entrance ticket".</li> 
  <li>At the bottom of the page, a link will appear. Copy and send it to your
  friend who is already editing collaboratively.</li>
</ol>
Afterwards, your friend must:
<ol type="A">
  <li>Copy/paste the link the dropdown part of the button "Share" > "Stamp
  ticket".</li>
  <li>Once again, a link will appear at the bottom of the page. He must copy
  and send it back to you.</li>
</ol>
Finally, once you obtain the link back, you must:
<ol start="3">
  <li>Copy/paste the link into the dropdown part of the button
  "Share" > "Confirm our arrival". 
</ol>

## Behind the scene (TODO)

###Distributed collaborative editor

###Causality

###Membership

###Message propagation

## References (TODO)