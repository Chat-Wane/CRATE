

function Model(){

    this.features = [{ icon:'fa-quote-left',
                       feature:'Create and edit your text documents!',
                       description:'This feature speaks for itself. '+
                       'The content of documents is up to you.' },
                     { icon:'fa-users',
                       feature:'Share and collaborate with your friends!',
                       description:'Share or join an editing session '
                       +'in a single click. Combined expertise will '
                       +'produce a top-quality document.'},
                     { icon:'fa-briefcase',
                       feature:'Keep your documents private!',
                       description:'No third-party involved in the process. '
                       +'Thus, no censorship, no economic intelligence issues, '
                       +'no privacy leaks. Basically, you own your documents.'},
                     // { icon:'fa-cubes',
                     //   feature:'How does it work?',
                     //   description:'Discover the underlying components of '+
                     //   'the editor by clicking on this section.'}
                    ];
    
    this.version = {
        current: '0.1.5',
        previous: '0.1.4',
        addedFeatures: [],
        updatedFeatures: ['The network is more reactive.'],
        bugFixes: ['QR-codes are working properly now.']
    };

    
    //    current: '0.1.4', previous: '0.1.3',
    //    addedFeatures: ['Links to editing sessions in preview mode are '+
    //                    'opened directly inside the editor.'],
    
    //     current: '0.1.3', previous: '0.1.2',
    //     addedFeatures: ['The editor can open multiple editing sessions at once'+
    //                     ' with session identifiers seperated by "&".'],
    //     updatedFeatures: ['Preview in markdown autorefresh every 5 seconds.'],
    //     bugFixes: ['Sharing address only carries one editing session.',
    //                'STUN provider has been updated.']
    // };

    // current: '0.1.2', previous: '0.1.1,
    //    addedFeatures: ['Display the cursor of other participants'],
    
    // current: '0.1.1', previous: '0.1.0',
    //    addedFeatures: [],
    //    updatedFeatures: [ 'Sharing does not timeout now, it stops by '+
    //                       'either clicking unshare or closing the editor'],
    //    bugFixes: [ 'On joining, it gets the document, whatever the size']

    // 0.0.2 -> 0.1.0
    //addedFeatures: [ 'Handle multiple documents',
    //                 'Presentation of features',
    //                 'Link to the Github project page' ],
    // updatedFeatures: [ 'General style of the editor' ],
    // bugFixes: [ 'A lot...' ]
};
