
function VersionView(versionSpan, changelogPopover){
    this.versionSpan = versionSpan;
    this.changelogPopover = changelogPopover;

    this.addedFeatures = [
        "Changelog"
    ];
    this.updatedFeatures = [
    ];
    
    this.initialize();
}

VersionView.prototype.initialize = function(){
    this.versionSpan.html("0.0.2");
    this.changelogPopover.attr("title", "Changelog");

    var changelogString = "";
    if (this.addedFeatures.length > 0){
        changelogString += "<i>Added features:</i><ul>"
        for (var i = 0; i<this.addedFeatures.length; ++i){
            changelogString += "<li>"+this.addedFeatures[i]+"</li>";
        };
        changelogString += "</ul>";
    };
    if (this.updatedFeatures.length > 0){
        changelogString += "<i>Updated features:</i><ul>"
        for (var i = 0; i<this.updatedFeatures.length; ++i){
            changelogString += "<li>"+this.updatedFeatures[i]+"</li>";
        };
        changelogString += "</ul>";
    };
            
    this.changelogPopover.attr("data-content", changelogString);

};
