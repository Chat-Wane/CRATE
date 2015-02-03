
/*!
 * \brief controller of the button that save the current file into the 
 * disk.
 * \param model the model of the application
 * \param saveOnDiskBtn the button that triggers the save as... of the document
 */
function SaveOnDiskButtonController(model, saveOnDiskBtn){

    function SaveToDisk(fileUrl, fileName) {
        var hyperlink = document.createElement('a');
        hyperlink.href = fileUrl;
        hyperlink.target = '_blank';
        hyperlink.download = fileName || fileUrl;

        var mouseEvent = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true
        });

        hyperlink.dispatchEvent(mouseEvent);

        // (window.URL || window.webkitURL).revokeObjectURL(hyperlink.href);
    }

    
    saveOnDiskBtn.click(
        function(){
            SaveToDisk('data:application/csv;charset=utf-8,' +
                       encodeURIComponent(JSON.stringify(model.document)),
                       model.document.id);
        }
    );
};
