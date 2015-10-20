# <img src="https://raw.githubusercontent.com/Chat-Wane/CRATE/master/img/crateicon.png" /> CRATE

<i>Keywords: distributed, decentralized, collaborative, real-time editor, network of browsers</i>

CRATE is a real-time distributed and decentralized CollaboRATive Editor running directly in web browsers.

## Try it out

<div style="text-align:center; width:inherit">
  <img src="https://raw.githubusercontent.com/Chat-Wane/CRATE/master/img/screenshot.png" style="max-width:500px"/>
  </div>

The [online demo](http://chat-wane.github.io/CRATE/) is available. First, make sure your browser is [WebRTC compatible](http://caniuse.com/#feat=rtcpeerconnection).

The short [video](https://www.dropbox.com/s/egf2c2do1jd331w/CRATE-video.mp4?dl=0) explains how to use it. It is not up-to-date but it still gives the general principle.

## Features

CRATE aims to enable collaborative editing anywhere, at anytime, whatever the number of participants, without third party. Compared to Google Docs, (i) CRATE does not limit the number of simultaneous users, (ii) CRATE does not rely on service providers, thus your documents belong to you and whom you trust, (iii) CRATE does not include all text editing capabitities. In particular, it lacks of group awareness.

CRATE is still in its very early stage of development. Therefore, the
application may be buggy. Also, even basic functionalities are not implemented yet. Feel free to [request functionalities, report issues, and ask questions](https://github.com/Chat-Wane/CRATE/issues).

## Developpers

CRATE comprises the following main components (i) LSeq [1, 2] manages the shared document; (ii) Spray [3] builds the network of browsers.

The different modules that compose the editor are:

* [jquery-crate](https://github.com/Chat-Wane/jquery-crate) which transforms divisions in distributed editors. It includes both the model and graphical entities.

  * [crate-core](https://github.com/Chat-Wane/crate-core) which includes the editor's model only.

    * [spray-wrtc](https://github.com/Chat-Wane/spray-wrtc) which creates a network of browsers as editing session.

    * [causal-broadcast-definition](https://github.com/Chat-Wane/CausalBroadcastDefinition) which disseminates messages following a causal order using a membership protocol (here Spray).

    * [version-vector-with-exceptions](https://github.com/Chat-Wane/version-vector-with-exceptions) which allows tracking causality between semantically related operations.

    * [lseqtree](https://github.com/Chat-Wane/LSEQTree) as the data structure which maintains total ordered sequences to represent documents.

## Acknowledgements

CRATE is developed within two research projects: The CominLabs project
[DESCENT](http://www.descent.cominlabs.ueb.eu/) and the ANR project
[SocioPlug](http://socioplug.univ-nantes.fr/). The CRATE editor is mainly
developed by [GDD team](https://sites.google.com/site/gddlina/),
[LINA](https://www.lina.univ-nantes.fr/), [Nantes
University](http://www.univ-nantes.fr/).

## References

[1] Nédelec, B., Molli, P., Mostefaoui, A., & Desmontils, E. (2013,
September). [LSEQ: an adaptive structure for sequences in distributed
collaborative
editing](http://hal.univ-nantes.fr/docs/00/92/16/33/PDF/fp025-nedelec.pdf). <i>In
Proceedings of the 2013 ACM symposium on Document engineering (pp. 37-46).</i> ACM.

[2] Nédelec, B., Molli, P., Mostefaoui, A., & Desmontils,
E. (2013). [Concurrency effects over variable-size identifiers in distributed
collaborative
editing](https://hal.archives-ouvertes.fr/hal-00921655/document). <i>In
Document Changes: Modeling, Detection, Storage and Visualization (Vol. 1008,
pp. 0-7).</i>

[3] Nédelec, B., Tanke, J., Frey, D., Molli, P., Mostefaoui, A. (2015).
[Spray, an Adaptive Random Peer Sampling Protocol](https://hal.archives-ouvertes.fr/hal-01203363/file/spray.pdf). <i>Technical Report.</i>
