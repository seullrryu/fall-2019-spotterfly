const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
var request = require("request");
const SpotifyWebApi = require("spotify-web-api-node");
var client_id = "e1d1de2574d343f7bdfe00a18421ebb2"; // Your client id
var client_secret = "9b99f7f012634b418dfccf205afa7af3"; // Your secret
var redirect_uri = "http://localhost:8888/callback"; // Your redirect uri
require("dotenv").config();
var querystring = require("querystring");
var cookieParser = require("cookie-parser");
const app = express();
const port = process.env.PORT || 8888;
const uri = app.use(cors());
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//const local = "mongodb://localhost/playground";
app.use(express.json());

const uri1 =
  "mongodb+srv://Alexander:helloworld123@cluster0-b7kar.gcp.mongodb.net/test?retryWrites=true&w=majority";
const router = express.Router();
mongoose.connect(uri1, { useNewUrlParser: true, useCreateIndex: true });

const connection = mongoose.connection;
connection
  .once("open", () => {
    console.log("MongoDB database connection established successfully");
  })
  .catch(err => console.error("could not connect to mongodb", err));

const userDataRouter = require("./routes/userData");
const ArtistRouter = require("./routes/Artist");

var tokenSchema = new mongoose.Schema({
  token: Object
});

var playlistSchema = new mongoose.Schema({
  id: String,
  songID: Array,
  displayName: String,
  songName: Array,
  image: Array,
  artist: Array,
  artistImage: Array
});

mongoose.model("playlistModels", playlistSchema);
mongoose.model("tokenModel", tokenSchema);

var playlistData = mongoose.model("playlistModels");
var tokenData = mongoose.model("tokenModel");

var client_id = "e1d1de2574d343f7bdfe00a18421ebb2"; // Your client id
var client_secret = "9b99f7f012634b418dfccf205afa7af3"; // Your secret
var redirect_uri = "http://localhost:8888/callback"; // Your redirect uri
const spotifyApi = new SpotifyWebApi();
/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function(length) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = "spotify_auth_state";

app
  .use(express.static(__dirname + "/public"))
  .use(cors())
  .use(cookieParser());

app.get("/login", function(req, res) {
  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope =
    "user-read-private user-read-email user-read-playback-state user-top-read playlist-read-private";
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
      })
  );
});

app.get("/callback", function(req, res) {
  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect(
      "/#" +
        querystring.stringify({
          error: "state_mismatch"
        })
    );
  } else {
    res.clearCookie(stateKey);
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
        //saves token to db just in case we need it?
        /*   async function saveToken() {
          Token = new tokenData({
            token: access_token
          });
          const result = await Token.save();
          //console.log(result); 
        }

        saveToken(); */

        /*      // use the access token to access t
        request.get(options, function(error, response, body) {
          //console.log(body.id);
          async function createUser() {
            User = new spotifyData({
              user: body
            });
            const result = await User.save();
            //console.log(result);
          }
          createUser();
        });
        */

        //saves user ID and song ID of user's top tracks during request
        request.get(options, function(error, response, body) {
          var userID = body.id;
          var userDisplay = body.display_name;
          var playlistOptions2 = {
            uri: "https://api.spotify.com/v1/me/top/tracks",
            headers: { Authorization: "Bearer " + access_token },
            json: true
          };
          var playlistOptions3 = {
            uri: "https://api.spotify.com/v1/me/top/artists",
            headers: { Authorization: "Bearer " + access_token },
            json: true
          };

          var playlistOptions3 = {
            uri: "https://api.spotify.com/v1/me/top/artists",
            headers: { Authorization: "Bearer " + access_token },
            json: true
          };

          request.get(playlistOptions2, function(error, response, body2) {
            var songs = Array();
            var songnames = Array();
            var img = Array();
            body2.items.forEach(function(items) {
              songs.push(items.id); //adding song id
              songnames.push(items.name); //adding song name
              img.push(items.album.images[1].url);
            });

            request.get(playlistOptions3, function(error, response, body3) {
              var artists = Array();
              var artistImages = Array();
              body3.items.forEach(function(items) {
                artists.push(items.name);
                artistImages.push(items.images[1].url);
              });

              async function createPlaylist() {
                playlist = new playlistData({
                  id: userID,
                  songID: songs,
                  displayName: userDisplay,
                  songName: songnames,
                  image: img,
                  artist: artists,
                  artistImage: artistImages
                });
                const result = await playlist.save();
                console.log(result);
              }
              createPlaylist();
            });
          });
          res.redirect(
            "http://localhost:3000/artists?" +
              querystring.stringify({
                user: userID
              })
          );
        });

        // we can also pass the token to the browser to make requests from there
        //     res.redirect(
        //       "http://localhost:3000/app#" +
        //        querystring.stringify({
        //           access_token: access_token,
        //          refresh_token: refresh_token
        //         })
        //      );
        //    } else {
        //      res.redirect(
        //        "http://localhost:3000/app#" /* +
        //          querystring.stringify({
        //            error: "invalid_token"
        //          }) */
        //       );
      }
    });
  }
});

app.get("/refresh_token", function(req, res) {
  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization:
        "Basic " +
        new Buffer(client_id + ":" + client_secret).toString("base64")
    },
    form: {
      grant_type: "refresh_token",
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      spotifyApi.setAccessToken(access_token);
      res.send({
        access_token: access_token
      });
    }
  });
});

/* app.get("/playlist", function(req, res) {
  playlistData.findOne({ _id: f47nt6lvjgbqcadsly5onj49h }).exec((err, data) => {
    if (err) {
      res.status(400).json("Error: " + err);
    } else {
      res.json(data);
      console.log(data);
    }
  });
*/
/* var authOptions = {
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
          if (err) {
            res.status(400).json("Error: " + err);
          } else {
            res.json(data);
            console.log(data);
          }
        });
      });
    }
  }); 
}); */

const playlistRouter = require("./routes/playlist");
app.use("/playlistdata", playlistRouter);
app.use("/userData", userDataRouter);
//app.use("/Artist", ArtistRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

module.exports = { app };
