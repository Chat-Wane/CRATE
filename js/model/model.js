

function Model(){

    this.features = [{ icon:"fa-quote-left",
                       feature:"Create and edit your text documents!",
                       description:"This feature speaks for itself. "+
                       "The content of documents is up to you." },
                     { icon:"fa-users",
                       feature:"Share and collaborate with your friends!",
                       description:"You can share or join an editing session "
                       +"in a single click. Your combined expertises will "
                       +"produce a top-quality document."},
                     { icon:"fa-briefcase",
                       feature:"Keep your documents private!",
                       description:"No third-party involved in the process. "
                       +"Thus, no censorship, no economic intelligence issues, "
                       +"no privacy leaks. Basically, you own your documents."}
                    ];
    this.version = {
        current: '0.1.0',
        previous: '0.0.2',
        addedFeatures: [ 'Handle multiple documents', 'Presentation page' ],
        updatedFeatures: [ 'General style of CRATE' ],
        bugFixes: [ 'A lot...' ]
    };
    
};
