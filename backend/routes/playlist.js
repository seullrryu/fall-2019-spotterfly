const router = require("express").Router();
let playlistData = require("../model/playlistdata.model");
var request = require("request");
var client_id = "e1d1de2574d343f7bdfe00a18421ebb2"; // Your client id
var client_secret = "9b99f7f012634b418dfccf205afa7af3"; // Your secret
var redirect_uri = "http://localhost:8888/callback";

/* router.route("/").get((req, res) => {
  var authOptions = {
    url: "https://accounts.spotify.com/api/token",
    form: {
      code: code,
      redirect_uri: redirect_uri,
      grant_type: "authorization_code"
    },
    headers: {
      Authorization:
        "Basic " +
        new Buffer(client_id + ":" + client_secret).toString("base64")
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token,
        refresh_token = body.refresh_token;

      var options = {
        url: "https://api.spotify.com/v1/me",
        headers: { Authorization: "Bearer " + access_token },
        json: true
      };

      request.get(options, function(error, response, body) {
        var userID;
        userID = body.id;
        JSON.stringify(userID);
        playlistData.findOne({ id: userID }).exec((err, data) => {
          // if (err) {
          //   res.status(400).json("Error: " + err);
          // } else {
          res.json(data);
          console.log(data);
          //  }
        });
      });
    }
  });
}); */

router.route("/:id").get((req, res) => {
  playlistData
    .findOne({ id: req.params.id })
    .then(playlistData => res.json(playlistData))
    .catch(err => res.status(400).json("Error: " + err));
});
module.exports = router;
