const mongoose = require("mongoose");

const Schema = mongoose.Schema;

var playlistSchema = new mongoose.Schema({
  id: String,
  songID: Array
});

mongoose.model("playlistModel", playlistSchema);
var playlistData = mongoose.model("playlistModel");

module.exports = playlistData;
