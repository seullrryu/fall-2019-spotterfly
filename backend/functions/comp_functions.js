const MyFunctions = require('./MyFunctions');



function DisplayOverlap(user1,user2,overlap){ // returns array of non overlapping songs 
    var screenOut = [];
    for(var i = 0; i < user1.length; i++ ){
        if (user2.indexOf(user1[i]) === -1){
            if(overlap){
                screenOut.push(user2[i]); //overlaps 
            }
        } else {
            if(!overlap){
                screenOut.push(user2[i]); //non overlaps 
            }
        }
    } 
    return screenOut;// non overlapping songs 
}


function OverlapCheck(user1,user2,overlap){ // user1 and user2 are song arrays overlap is how many songs they need in common to match 
    var count;
    for(var i =0; i < user1.length; i++ ){
        if (user2.indexOf(user1[i]) !== -1){
            count ++; 
        }
    } if (count >= overlap){
        var screenOut = DisplayOverlap(user1,user2,true); //checks for overlap
        if (screenOut === undefined || screenOut.length == 0) {
            return false;
        } else {
            var extras = DisplayOverlap(user1,user2,false); // gets list of all non overlaped 
            //send var extras and screenOut to front end.  or figure out how to do this 
            //screen out is what they matched on 
            //extras are the ones that they differed 
            return true;
        }
    }
    return false; 
}


// function checkAll(currentUser, otherUsers) needs to be made 
//must determine how to loop through all users to grab songs 
//takes in current user as an object and looks at its location first 
// if the location matches with the otherUser location by calling myFunctions distance_checker 
// call overlapCheck() on user1's playlist and the user that has been flagged playlist.
// must shoot the list returned back out to frontend, or store in a dictionary 
// dictionary in terms of {User: {overlaps:[], nOverlaps:[]}} and return that dictionary 
// will see professor for this 

    module.exports = {OverlapCheck, DisplayOverlap}