# CRATE

<i>Keywords: distributed, decentralized, collaborative, editor,
browser-to-browser communication </i>

CRATE is a real-time distributed and decentralized CollaboRATive Editor running
directly in web browsers.

* You can try the [online demo](http://chat-wane.github.io/CRATE/), but first, make
sure your browser is [WebRTC compatible](http://caniuse.com/#feat=rtcpeerconnection).
* A short [video](https://www.dropbox.com/s/egf2c2do1jd331w/CRATE-video.mp4?dl=0)
explains how to use it.

CRATE aims to scale to large number of participants working on large documents.
It relies on two main components: LSEQ [1, 2] to manage the shared document, and
SPRAY [?] to gossip operations on a network of browsers. Compared to Google Docs:

* CRATE does not limit the number of simultaneous users. We tested it uptill 600
participants typing over a million characters at a global rate of ~100
characters per seconds. How many can you get? ;D
* Thanks to WebRTC, you can collaborate without any service providers. Your documents
belong to you and whom you trust.
* Yet, CRATE is not as nice as Google Docs ;). It still lacks of
[wysiwyg](https://en.wikipedia.org/wiki/WYSIWYG) capabilities
and group awareness.

CRATE is developed within two research projects: The CominLabs project
[DESCENT](http://www.descent.cominlabs.ueb.eu/) and the ANR project
[SocioPlug](http://socioplug.univ-nantes.fr/). The CRATE editor is mainly
developed by [GDD team](https://sites.google.com/site/gddlina/),
[LINA](https://www.lina.univ-nantes.fr/), [Nantes
University](http://www.univ-nantes.fr/).

CRATE is still in its very early stage of development. Therefore, the
application may be buggy. Also, even basic functionalities are not implemented
yet. Feel free to request functionalities, report issues, and ask your questions
at this [link](https://github.com/Chat-Wane/CRATE/issues).

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


