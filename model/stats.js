
/*!
 * \brief gather data to show them to the user. With them, the user should 
 * be able to easily understand the behaviour of CRATE
 */
function Stats(){
    // #1 the in/out views of the local peer over time, i.e., how many users
    // are connected to me, and how many users am I connected to?
    this.viewSize = {
        labels: [0,0,0,0,0,0,0,0,0,0,0],
        series: [ {name: 'incoming connections',
                   data: [0,0,0,0,0,0,0,0,0,0,0]},
                  {name: 'outgoing connections',
                   data: [0,0,0,0,0,0,0,0,0,0,0]}]
    };
    // #2 the in/out number of messages over time
    this.traffic = {
        labels: [0,0,0,0,0,0,0,0,0,0,0],        
        series: [ {name: 'incoming traffic',
                   data: [0,0,0,0,0,0,0,0,0,0,0]},
                  {name: 'outgoing traffic',
                   data: [0,0,0,0,0,0,0,0,0,0,0]} ]
    };
    
};
