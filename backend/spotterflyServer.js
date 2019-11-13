const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
var request = require("request");
const SpotifyWebApi = require("spotify-web-api-node");
var client_id = "e1d1de2574d343f7bdfe00a18421ebb2"; // Your client id
var client_secret = "9b99f7f012634b418dfccf205afa7af3"; // Your secret
var redirect_uri = "http://localhost:8888/callback"; // Your redirect uri
var data;

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;
const uri = app.use(cors());
const local = "mongodb://localhost/playground";
app.use(express.json());
//const uri = process.env.ATLAS_URI;

mongoose.connect(local, {
  useNewUrlParser: true,
  useCreateIndex: true
});

const connection = mongoose.connection;
connection
  .once("open", () => {
    console.log("MongoDB database connection established successfully");
  })
  .catch(err => console.error("could not connect to mongodb", err));

const userDataRouter = require("./routes/userData");
const ArtistRouter = require("./routes/Artist");

var spotifyApi = new SpotifyWebApi({
  clientId: "e1d1de2574d343f7bdfe00a18421ebb2",
  clientSecret: "9b99f7f012634b418dfccf205afa7af3",
  redirectUri: "http://localhost:8888/callback"
});

/* var scope =
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
  ); */

var authOptions = {
  url: "https://accounts.spotify.com/api/token",
  headers: {
    Authorization:
      "Basic " + new Buffer(client_id + ":" + client_secret).toString("base64")
  },
  form: {
    grant_type: "client_credentials"
  },
  json: true
};
if (token) {
  spotifyApi.setAccessToken(token);
}

request.post(authOptions, function(error, response, body) {
  if (!error && response.statusCode === 200) {
    // use the access token to access the Spotify Web API
    var token = body.access_token;
    var options = {
      url: "https://api.spotify.com/v1/me/tracks",
      headers: {
        Authorization: "Bearer " + token
      },
      json: true
    };
    request.get(options, function(error, response, body) {
      data = console.log(body);
      console.log(body);
    });
  }
});
console.log(data);

app.use("/userData", userDataRouter);
app.use("/Artist", ArtistRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

module.exports = { app };
