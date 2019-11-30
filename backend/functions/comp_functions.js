const mongoose = require("mongoose");

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
            // make a map of matches, wipe old matches and rerun check 

            return true;
        }
    }
    return false; 


    function distance(lat1, lon1, lat2, lon2) { //geolocation obeject me 
        if ((lat1 == lat2) && (lon1 == lon2)) {
            return 0;
        }
        else {
            var newlat1 = Math.PI * lat1/180;
            var newlat2 = Math.PI * lat2/180;
            var theta = lon1-lon2;
            var newtheta = Math.PI * theta/180;
            var dist = Math.sin(newlat1) * Math.sin(newlat2) + Math.cos(newlat1) * Math.cos(newlat2) * Math.cos(newtheta);
            if (dist > 1) {
                dist = 1;
            }
            dist = Math.acos(dist);
            dist = dist * 180/Math.PI;
            dist = dist * 60 * 1.1515;
    
        }
        return dist;
    }

    function distance_checker(dist,range){ // takes in distance from formula and checks it with range 
        if(Math.abs(dist) <= range){
            return true;
        } else {
            return false;
        }
    }

}


    function checkAll(user1){
        //db.userData.find().forEach(function(myDoc) { print( "user: " + myDoc.id); } );  // need to figure out for each and how it workse 
        db.userData.find().forEach(function(myDoc) { 
            if(dist(distance_checker(user1.LonLat[0],user1.LonLat[1],myDoc.LonLat[0],myDoc.LonLat[1]),5)){ // takes distances and checks through distance to see if its in range.#TODO change the range 
                console.log("passed distance check");
                if (OverlapCheck(user1, myDoc.Songs,1)){ // checks overlap of 1 #TODO change the overlap num 
                    console.log("there were matches"); 
                } else {
                     console.log("No matches!!!!!");
                }
            }
        } );  
    }




//must determine how to loop through all users to grab songs 
//takes in current user as an object and looks at its location first 
// if the location matches with the otherUser location by calling myFunctions distance_checker 
// call overlapCheck() on user1's playlist and the user that has been flagged playlist.
// must shoot the list returned back out to frontend, or store in a dictionary 
// dictionary in terms of {User: {overlaps:[], nOverlaps:[]}} and return that dictionary 
// will see professor for this 

    module.exports = checkAll;