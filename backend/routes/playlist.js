const router = require("express").Router();
let playlistData = require("../model/playlistdata.model");
var request = require("request");

router.get("/", function(req, res) {
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
        var userID = body.id;
        playlistData.findOne({ id: userID }).exec((err, data) => {
          //  if (err) {
          //    res.status(400).json("Error: " + err);
          //  } else {
          res.json(data);
          console.log(data);
          //         }
        });
      });
    }
  });
});

/*router.get("/", function(req, res) {
  playlistData
    .findOne({ id: "f47nt6lvjgbqcadsly5onj49h" })
    .exec((err, data) => {
      if (err) {
        res.status(400).json("Error: " + err);
      } else {
        res.json(data);
        console.log(data);
      }
    });
});
*/
module.exports = router;
