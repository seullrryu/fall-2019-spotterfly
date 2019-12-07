const mongoose = require("mongoose");

<<<<<<< HEAD
function OverlapCheck(user1,user2,overlap){ // user1 and user2 are song arrays overlap is how many songs they need in common to match 
  var count = 0;
  var u2Songs = user2.Songs;
  var screenOut = [];
  for(var i =0; i < user1.length; i++ ){
    if (u2Songs.indexOf(user1[i]) !== -1){
      screenOut.push(user1[i]);
      count ++; 
    }
  } if (count >= overlap){
    return screenOut        
  } else {
    return null;
  }
}
  


  function distance(lat1, lon1, lat2, lon2) {
    if (lat1 === lat2 && lon1 === lon2) {
      return 0;
    } else {
      var newlat1 = (Math.PI * lat1) / 180;
      var newlat2 = (Math.PI * lat2) / 180;
      var theta = lon1 - lon2;
      var newtheta = (Math.PI * theta) / 180;
      var dist =
        Math.sin(newlat1) * Math.sin(newlat2) +
        Math.cos(newlat1) * Math.cos(newlat2) * Math.cos(newtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = (dist * 180) / Math.PI;
      dist = dist * 60 * 1.1515;
=======
const DisplayOverlap = function(user1,user2,overlap){ // returns array of non overlapping songs 
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


const OverlapCheck = function(user1,user2,overlap) { // user1 and user2 are song arrays overlap is how many songs they need in common to match 
    var count;
    for(var i =0; i < user1.length; i++ ){
        if (user2.indexOf(user1[i]) !== -1){
            count ++; 
        }
    } 
    if (count >= overlap){
      var screenOut = DisplayOverlap(user1,user2,true); //checks for overlap
      if (screenOut === undefined || screenOut.length == 0) {
          return false;
      } 
      else {
          var extras = DisplayOverlap(user1,user2,false); // gets list of all non overlaped 
          //send var extras and screenOut to front end.  or figure out how to do this 
          //screen out is what they matched on 
          //extras are the ones that they differed 
          // make a map of matches, wipe old matches and rerun check 

          return true;
      }
    }
  return false;
}

function distance(lat1, lon1, lat2, lon2) {
  //geolocation obeject me
  if (lat1 == lat2 && lon1 == lon2) {
    return 0;
  } else {
    var newlat1 = (Math.PI * lat1) / 180;
    var newlat2 = (Math.PI * lat2) / 180;
    var theta = lon1 - lon2;
    var newtheta = (Math.PI * theta) / 180;
    var dist =
      Math.sin(newlat1) * Math.sin(newlat2) +
      Math.cos(newlat1) * Math.cos(newlat2) * Math.cos(newtheta);
    if (dist > 1) {
      dist = 1;
>>>>>>> 94cf8809e7d485eec98bb478086a919e56350924
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
  }
  return dist;
}

function distance_checker(dist, range) {
  // takes in distance from formula and checks it with range
  if (Math.abs(dist) <= range) {
    return true;
  } 
  else {
    return false;
  }
<<<<<<< HEAD
=======
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

>>>>>>> 94cf8809e7d485eec98bb478086a919e56350924


function checkAll(user1){
  var matches = new Map();
    db.userData.find().forEach(function(myDoc) { 
      if (user1 === myDoc){
        continue;
      }
      var matched_songs = []
      if(dist(distance_checker(user1.LonLat[0],user1.LonLat[1],myDoc.LonLat[0],myDoc.LonLat[1]),5)){ // takes distances and checks through distance to see if its in range.#TODO change the range 
        console.log("passed distance check");
        if ((matched_songs = OverlapCheck(user1.Songs, myDoc,1))=== null) { // idk if the matched_songs = in an if works but it should
          console.log("No matches!!!!!");
        } else {
          console.log("there were matches"); 
          matches.set(myDoc.UserID, matched_songs);
        }
      }
  });  
}


module.exports = checkAll;
export default OverlapCheck; 