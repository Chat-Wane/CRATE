
function CSaveButton(button, editor){

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
    }

    button.click(
        function(){
            // #A prepare the object to save
            var toSave = {                
                sequence: editor.model.sequence,
                causality: editor.model.causality,
                name: editor.model.name,
                webRTCOptions: editor.model.webRTCOptions,
                signalingOptions: editor.model.signalingOptions
            };
            // #B save it on disk using the downloading process of browsers
            SaveToDisk('data:application/csv;charset=utf-8,' +
                       encodeURIComponent(JSON.stringify(toSave)),
                       editor.model.name);
        }
    );
    
};
