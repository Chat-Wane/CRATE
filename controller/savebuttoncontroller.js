
/*!
 * \brief controller of the button that save the current file into the 
 * localStorage.
 * \param model the model of the application
 * \param saveBtn the button that triggers the save of the document
 */
function SaveButtonController(model, saveBtn){
    saveBtn.click(
        function(){
            localStorage.setItem(model.document.id,
                                 JSON.stringify(model.document));
        }
    );
};
