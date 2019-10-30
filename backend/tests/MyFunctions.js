

function distance_checker(dist,range){ // takes in distance from formula and checks it with range 
    if(Math.abs(dist) <= range){
        return true;
    } else {
        return false;
    }
}
function uniqueID(newID,oldID){
    if(oldID == newID){
        return false;
    }
    return true; 
}
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

function overlap_check(item1,item2,overlap){ // would loop through items to find percent of overlap 
    if (item1 == item2){
        return (overlap +1);
    }
    return overlap;
}

function match(overlap,criteria_overlap){  // eventually will use this to display usernames 
    if (overlap >= criteria_overlap){
        return true;
    }
    return false; 
}



module.exports = {distance_checker, uniqueID, distance, match,overlap_check }