#CRATE

<i>Keywords: distributed editor, decentralized, confict-free replicated data
type (CRDT), WebRTC-based gossiping.</i>

CRATE is a real-time distributed CollaboRATive Editor running directly
within your browser. Eventually, it will provide all the convenient
functionnalities of common editors.
One of the major interest of this editor is based in the fact that it does not
rely on any central server. It alleviates some topology-specific issues
(e.g. ownership, economic intelligence, scalability in number of users,
availability, limitations in term of service etc.). Knowingly, users entirely
control their own documents and decide to whom they share them. Each author
holds a replica of the document locally, hence, is able to edit offline.

##Usage

The editor is accessible [here](http://chat-wane.github.io/CRATE).  You can
already start editing.

To share a document, click on the button "Share" at the top of the page. A link
will appear. Give it to your collaborator. Soon, the latter should be connected
to you.

To join an editing session, it is more complicated (for now):
<ol>
  <li>Click on "Network" > "Get an entrance ticket".</li> 
  <li>At the bottom of the page, a link will appear. Copy and send it to your
  friend.</li>
</ol>
Afterward, your friend must:
<ol>
  <li>Copy/paste the link into "Network" > "Stamp ticket".</li>
  <li>Once again, a link will appear at the bottom of the page. He must copy
  and send it back to you.</li>
</ol>
Finally, once you get the link back you must:
<ol>
  <li>Copy/paste the link into "Network" > "Confirm our arrival". The planet
  near the "Network" button should go from red to green once you are
  connected.</li>
</ol>

## Behind the scene (TODO)
