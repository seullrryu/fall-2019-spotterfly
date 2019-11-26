const mongoose = require("mongoose");

const Schema = mongoose.Schema;

var playlistSchema = new mongoose.Schema({
  id: String,
  songID: Array,
  displayName: String,
  songName: Array,
  image: Array,
<<<<<<< Updated upstream
  artistName: Array,
=======
  artist: Array,
>>>>>>> Stashed changes
  artistImage: Array
});

mongoose.model("playlistModel", playlistSchema);
var playlistData = mongoose.model("playlistModel");

module.exports = playlistData;
