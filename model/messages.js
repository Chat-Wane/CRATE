
/*!
 * \brief object that represents an anti-entropy request message containing
 * the metadata necessary to retrieve the missing elements.
 * \param uid the unique site identifier of the requester
 * \param idDocument the identifier of the targeted document
 * \param causality the causality tracking metadata of the targeted document
 */
function MAntiEntropyRequest(uid, idDocument, causality){
    this.type = "MAntiEntropyRequest";
    this.uid = uid;
    this.idDocument = idDocument;
    this.causality = causality;
};

/*!
 * \brief object that represents the response to an anti-entropy request 
 * message.
 * \param idDocument the identifier of the document
 * \param elements the elements identified as misssing at the original peer
 */
function MAntiEntropyResponse(idDocument, elements){
    this.type = "MAntiEntropyResponse";
    this.idDocument = idDocument;
    this.elements = elements;
};

