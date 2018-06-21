# <img src="https://raw.githubusercontent.com/Chat-Wane/CRATE/master/img/crateicon.png" > CRATE

<i>Keywords: distributed, decentralized, collaborative, real-time editor,
network of browsers</i>

CRATE is a real-time distributed and decentralized CollaboRATive Editor running
directly in web browsers.

## Try it out

<div style="text-align:center; width:inherit"> <img
  src="https://raw.githubusercontent.com/Chat-Wane/CRATE/master/img/screenshot.png"
  style="max-width:500px"/> </div>

The [online demo](http://chat-wane.github.io/CRATE/) is available. First, make
sure your browser is [WebRTC
compatible](http://caniuse.com/#feat=rtcpeerconnection).

The short
[video](https://www.dropbox.com/s/egf2c2do1jd331w/CRATE-video.mp4?dl=0) explains
how to use it. It is not up-to-date but it still gives the general principle.

## Features

CRATE aims to enable collaborative editing anywhere, at anytime, whatever the
number of participants, without third party. Compared to Google Docs, (i) CRATE
does not limit the number of simultaneous users, (ii) CRATE does not rely on
service providers, thus your documents belong to you and whom you trust, (iii)
CRATE does not include all text editing capabilities.

CRATE is still in its very early stage of development. Therefore, the
application may be buggy. Also, even basic functionalities are not implemented
yet. Feel free to [request functionalities, report issues, and ask
questions](https://github.com/Chat-Wane/CRATE/issues).

## Get started

When you open such [link](http://chat-wane.github.io/CRATE), you should see an
empty page. To create a new empty document, click on the top-right blinking
button. A menu appears containing 3 choices: (i) <i>new document</i>, (ii)
<i>open document</i>, (iii) <i>join an editing session</i>. For now, click on
the first option and enter the name of your document.

<div style="text-align:center; width:inherit"> <img
  src="https://raw.githubusercontent.com/Chat-Wane/CRATE/master/img/new.gif"
  style="max-width:500px"/> </div>

Currently, you have an empty document that you alone can edit. To enable
collaborative editing, you must share the access to this document. To do so,
click on the share button in the document's task bar. If everything goes well,
you should see a blue spinning circle meaning that the document is accessible.
In addition, you should see a sharing link on the bottom of the document
containing the editing session identifier. Copy it.

<div style="text-align:center; width:inherit"> <img
  src="https://raw.githubusercontent.com/Chat-Wane/CRATE/master/img/share.gif"
  style="max-width:500px"/> </div>

Now, if you open the URL raw, a document should automatically appear trying to
connect to the editing session. As an alternative, you can perform again the
first step of this section but instead of creating a new document, you choose
the third option : <i>join an editing session</i>. Then paste the URL in the
relevant field, click on the join button, and the document should appear as
well.

<div style="text-align:center; width:inherit"> <img
  src="https://raw.githubusercontent.com/Chat-Wane/CRATE/master/img/join.gif"
  style="max-width:500px"/> </div>

Be patient, establishing a connection may take time (hopefully less than 30
seconds depending on restrictions of your network). Once the joining editor has
established the connections, you should observe a green globe in the document's
task bar. Soon, it will retrieve the characters composing the shared document
and you will be able to start the collaborative editing.

<div style="text-align:center; width:inherit"> <img
  src="https://raw.githubusercontent.com/Chat-Wane/CRATE/master/img/writing.gif"
  style="max-width:500px"/> </div>

About the task bar buttons:

* <i>The floppy disk</i> saves the document and allows you to open it later by
  clicking on the second option of the menu described in the first
  step. Contrarily to Cloud-based solutions, CRATE does not provide persistence
  with ubiquitous access. Thus, instead of making an effort to forget data
  (which is close from impossible in the Cloud), users must make an effort to
  remember them.

* <i>The eye</i> allows users to apply a style to their document. For now, it
  solely supports the [markdown
  language](https://en.wikipedia.org/wiki/Markdown).

* <i>The chain</i> allows sharing the document. An editing session is accessible
  if at least one collaborator shares its access. In other terms, an editing
  session becomes fully private if none of its members share their access, even
  if the sharing link is publicly released.

* <i>The cogs</i> should open the configuration panel of the document (currently
  disabled). For instance, syntax highlighting, preview options, network options
  etc.

## Developers
### How to build
To build CRATE at home, you need [git](https://git-scm.com/),
[bower](http://bower.io/), and [lessc](http://lesscss.org/). In a terminal, type
the following commands:
```
$ git clone http://github.com/chat-wane/crate.git
$ cd crate

$ bower install
$ lessc css/style.less css/generatedstyle.css
```
Now you are able to open the <i>index.html</i> file using your web browser.

### Dependencies
CRATE comprises the following main components (i) LSeq [1, 2, 4] manages the shared
document; (ii) Spray [3] builds the network of browsers.

The different modules that compose the editor are:

* [jquery-crate](https://github.com/Chat-Wane/jquery-crate) which transforms
  divisions in distributed editors. It includes both the model and graphical
  entities.

  * [crate-core](https://github.com/Chat-Wane/crate-core) which includes the
    editor's model only.

    * [spray-wrtc](https://github.com/Chat-Wane/spray-wrtc) which creates a
      network of browsers as editing session.

    * [causal-broadcast-definition](https://github.com/Chat-Wane/CausalBroadcastDefinition)
      which disseminates messages following a causal order using a membership
      protocol (here Spray).

    * [version-vector-with-exceptions](https://github.com/Chat-Wane/version-vector-with-exceptions)
      which allows tracking causality between semantically related operations.

    * [lseqtree](https://github.com/Chat-Wane/LSEQTree) as the data structure
      which maintains total ordered sequences to represent documents.

## Acknowledgments

CRATE is developed within two research projects: The CominLabs project
[DESCENT](http://www.descent.cominlabs.ueb.eu/) and the ANR project
[SocioPlug](http://socioplug.univ-nantes.fr/). The CRATE editor is mainly
developed by [GDD team](https://sites.google.com/site/gddlina/),
[LINA](https://www.lina.univ-nantes.fr/), [Nantes
University](http://www.univ-nantes.fr/).

## References

[1] B. Nédelec, P. Molli, A. Mostéfaoui, and E. Desmontils (September
2013). [LSEQ: An Adaptive Structure for Sequences in Distributed Collaborative
Editing](http://hal.univ-nantes.fr/docs/00/92/16/33/PDF/fp025-nedelec.pdf). <i>ACM
symposium on Document engineering (pp. 37-46).</i>

[2] B. Nédelec, P. Molli, A. Mostéfaoui, and E. Desmontils (2013). [Concurrency
Effects Over Variable-Size Identifiers in Distributed Collaborative
Editing](https://hal.archives-ouvertes.fr/hal-00921655/document). <i>In Document
Changes: Modeling, Detection, Storage and Visualization (Vol. 1008,
pp. 0-7).</i>

[3] B. Nédelec, J. Tanke, D. Frey, P. Molli, and A. Mostéfaoui (2018).  [An
Adaptive Peer-Sampling Protocol for Building Networks of
Browsers](https://hal.inria.fr/hal-01619906/document). <i>World Wide Web,
vol. 21.</i> Springer.

[4] B. Nédelec, P. Molli, and A. Mostéfaoui (2016). [A scalable sequence
encoding for collaborative
editing](https://hal.archives-ouvertes.fr/hal-01552799/document). <i>Concurrency
and Computation: Practice and Experience.</i> Wiley.