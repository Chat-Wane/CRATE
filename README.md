# CRATE

<i>Keywords: distributed, decentralized, collaborative, editor,
browser-to-browser communication </i>

CRATE is a real-time distributed and decentralized CollaboRATive Editor running
directly in web browsers. 
* You can test it online at http://chat-wane.github.io/CRATE/#. 
* A little [video](https://www.dropbox.com/s/egf2c2do1jd331w/CRATE-video.mp4?dl=0) to explain how to use it

CRATE is developped within two projects: The cominlabs project [DESCENT](http://www.descent.cominlabs.ueb.eu/) and the ANR project [SOCIOPLUG](http://socioplug.univ-nantes.fr/). 

CRATE is designed to scale for a large number of participants working on large documents.
It is based mainly on two components: LSEQ for managing the shared document, and SPRAY to gossip operations on a network of browsers. Compared to Google docs:
* CRATE has no limit on the number of simultaneous users, we tested it until 600 participants with chrome browsers. How many can you get ;D
* It requires no intermediate servers thanks to WebRTC
* So you can collaborate without collaboration providers.
* But CRATE is not as nice than Google Doc ;)

The LSEQ algorithm is described in:
> Nédelec, B., Molli, P., Mostefaoui, A., & Desmontils, E. (2013, September). [LSEQ: an adaptive structure for 
> sequences in distributed collaborative editing](http://hal.univ-nantes.fr/docs/00/92/16/33/PDF/fp025-nedelec.pdf). 
> In Proceedings of the 2013 ACM symposium on Document engineering (pp. 37-46). ACM.

and in:
> Nédelec, B., Molli, P., Mostefaoui, A., & Desmontils, E. (2013). [Concurrency effects over variable-size 
> identifiers in distributed collaborative editing](https://hal.archives-ouvertes.fr/hal-00921655/document). In 
> Document Changes: Modeling, Detection, Storage and Visualization (Vol. 1008, pp. 0-7).


CRATE is still in its very early stage of development. Therefore, the
application may be buggy. Also, even basic functionalities are not implemented
yet. Feel free to request functionalities, report the issues, and ask your
questions at this [link](https://github.com/Chat-Wane/CRATE/issues).

