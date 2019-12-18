const router = require("express").Router();
let UserData = require("../model/userData.model");
function OverlapCheck(user1, user2, overlap) {
  // user1 and user2 are song arrays overlap is how many songs they need in common to match
  var count = 0;
  var u1Songs = user1.songs;
  var u2Songs = user2.songs;
  var screenOut = [];
  for (var i = 0; i < u1Songs.length; i++) {
    console.log(u2Songs[i]);
    if (u2Songs.indexOf(u1Songs[i]) !== -1) {
      screenOut.push(u1Songs[i]);
      count++;
    }
  }
  if (count >= overlap) {
    return screenOut;
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

/*function checkAll(user1) {
  var matches = new Map();
  db.userData.find().forEach(function(myDoc) {
    if (user1 === myDoc) {
      break;
    }
    var matched_songs = [];
    if (
      distance_checker(
        distance(
          user1.LonLat[0],
          user1.LonLat[1],
          myDoc.LonLat[0],
          myDoc.LonLat[1]
        ),
        5
      )
    ) {
      // takes distances and checks through distance to see if its in range.#TODO change the range
      console.log("passed distance check");
      if ((matched_songs = OverlapCheck(user1.songs, myDoc, 1)) === null) {
        // idk if the matched_songs = in an if works but it should
        console.log("No matches!!!!!");
      } else {
        console.log("there were matches");
        matches.set(myDoc.UserID, matched_songs);
      }
    }
  });
} */

async function checkAll2(id) {
  //replace id with your spotify id to debug. open web browser to localhost://8888/userdata/find and check terminal console
  var matches = new Map();
  const user1 = await UserData.findOne({ userID: id }); //find user(you) from database;
  const user2 = await UserData.find({
    userID: { $nin: [id] } //find everyone whos not the user from database
  });
  console.log(user2);
  //console.log(songdat);
  for (var i = 0; i < user2.length; i++) {
    //looping through other users in the database. user2[i] = user2 at ith position in the document
    if (
      distance_checker(
        // distance checker sees if the distance between the user and the other user is <5
        distance(
          //distance takes in user longitude latitude and the other user's longitude latitude
          user1.LonLat[0],
          user1.LonLat[1],
          user2[i].LonLat[0],
          user2[i].LonLat[1]
        ),
        5
      )
    ) {
      if ((matched_songs = OverlapCheck(user1, user2[i], 1)) === null) {
        //overlapchecks for similar songs between user1 and user2[i], 1 is the number of overlapped songs allowed
        console.log("No matches!!!!!");
      } else {
        console.log("there were matches");
        // matches.set(user2[i].userID, matched_songs);
        var json = { user: user2[i].userID, songs: matched_songs }; //return it in json format
      }
      //console.log(matches);

      /* if (user2[i].userID != user1.userID && !nearby.includes(user2[i])) {
        nearby.push(user2[i]);
      } */
    }
  }
  return json;
}

router.route("/find").get(async (req, res) => {
  res.json(checkAll2(id));
});

router.route("/").get((req, res) => {
  UserData.find()
    .then(userData => res.json(userData))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").post((req, res) => {
  async function createUser2() {
    const newUser = new UserData({
      userID: 11111,
      name: "Joseph Joestar",
      songs: [
        "0YveezON7jpiaHA8fnUHxN",
        "4prEPl61C8qZpeo3IkYSMl",

        "7GyDcM22nxCJHcQa11fbYk",

        "02Bj0KWmT8OznkcfKyDSDc",

        "4K3jhGzgxlU9yYP72bHffX",

        "060WwU9cva7KOpMhZAJjT6",

        "15IWqq4MaJ09ZQZgzcbn4p",

        "1ZURRCb1lFN3fbFHXHHhUV",

        "2RvbnvBX3XKkHy8daq3PUT"
      ],
      LonLat: [1111111, 1111111],
      songName: [
        "Roundabout",
        "Where the Sky Hang",
        "Seaweed Song",

        "Let Your Love Grow Tall",

        "Six Weeks",
        "Love Love Love",
        "Yellow Light",
        "Mr. Brightside",
        "Lakehouse"
      ],
      preview: req.body.preview
    });
    const result = await newUser.save();
    console.log(result);
  }

  createUser2();

  async function createUser() {
    const newUser = new UserData({
      userID: req.body.id,
      name: req.body.name,
      songs: req.body.songs,
      LonLat: req.body.location,
      songName: req.body.songNames,
      artists: req.body.artists,
      previewURL: req.body.preview
    });
    const result = await newUser.save();
    console.log(result);
  }

  createUser();
});

module.exports = router;
