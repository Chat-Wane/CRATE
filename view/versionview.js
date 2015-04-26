
function VersionView(versionSpan, changelogPopover){
    this.versionSpan = versionSpan;
    this.changelogPopover = changelogPopover;

    this.previousVersion = "0.0.1";
    this.version = "0.0.2";
    
    this.addedFeatures = [
        "Changelog"
    ];
    this.updatedFeatures = [
        "Cosmetics of network info"
    ];
    this.bugFixes = [
        "Unshare button"
    ];
    
    this.initialize();
}

VersionView.prototype.initialize = function(){
    this.versionSpan.html(this.version);
    
    var versionString = "Changelog "+
        this.previousVersion+
        " <i class='fa fa-long-arrow-right'></i> "+
        this.version;
    
    this.changelogPopover.attr("title", versionString);

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
    if (this.bugFixes.length > 0){
        changelogString += "<i>Fixed bugs:</i><ul>"
        for (var i = 0; i<this.bugFixes.length; ++i){
            changelogString += "<li>"+this.bugFixes[i]+"</li>";
        };
        changelogString += "</ul>";
    };
    
    this.changelogPopover.attr("data-content", changelogString);

};
