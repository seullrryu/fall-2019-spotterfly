const mongoose = require("mongoose");

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
    }
    return dist;
  }

  function distance_checker(dist, range) {
    // takes in distance from formula and checks it with range
    if (Math.abs(dist) <= range) {
      return true;
    } else {
      return false;
    }
  }


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
