
/*!
 * \brief controller of the button that remove the current file from the 
 * localStorage.
 * \param model the model of the application
 * \param saveBtn the button that triggers the save of the document
 */
function DeleteButtonController(model, saveBtn){
    deleteBtn.click(
        function(){
            // #1 remove the current file from the local storage
            localStorage.removeItem(model.document.id);
            // #2 reset the model
            // #2A disconnect the network
            // #2B sequence re-initialized
            // #2C causality meta data re-initialized
            // #3 reset the view
        }
    );
};
