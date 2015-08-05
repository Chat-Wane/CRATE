function VersionView(version, versionSpan, changelogPopover){
    this.version = version;
    this.versionSpan = versionSpan;
    this.changelogPopover = changelogPopover;

    this.initialize();
}

VersionView.prototype.initialize = function(){
    this.versionSpan.html(this.version.current);

    var versionString = "Changelog "+
        this.version.previous+
        " <i class='fa fa-long-arrow-right'></i> "+
        this.version.current;

    this.changelogPopover.attr("title", versionString);

    var changelogString = "";
    if (this.version.addedFeatures.length > 0){
        changelogString += "<i>Added features:</i><ul>"
        for (var i = 0; i<this.version.addedFeatures.length; ++i){
            changelogString += "<li>"+this.version.addedFeatures[i]+"</li>";
        };
        changelogString += "</ul>";
    };
    if (this.version.updatedFeatures.length > 0){
        changelogString += "<i>Updated features:</i><ul>"
        for (var i = 0; i<this.version.updatedFeatures.length; ++i){
            changelogString += "<li>"+this.version.updatedFeatures[i]+"</li>";
        };
        changelogString += "</ul>";
    };
    if (this.version.bugFixes.length > 0){
        changelogString += "<i>Fixed bugs:</i><ul>"
        for (var i = 0; i<this.version.bugFixes.length; ++i){
            changelogString += "<li>"+this.version.bugFixes[i]+"</li>";
        };
        changelogString += "</ul>";
    };

    this.changelogPopover.attr("data-content", changelogString);

};

