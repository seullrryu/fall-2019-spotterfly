const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userDataSchema = new Schema({
  userID: String,
  name: String,
  songs: [],
  LonLat: []
  //required: true, // #TODO will be required post add

  //Add hashmap of matches to be rewritten every time there are matches found and deleted when there are none.  This will help us by allowing a return to the frontend of user with matched songs },

  //timestamps: true // use some sort of time for login / sync not this one
});

const UserData = mongoose.model("userData", userDataSchema);

module.exports = UserData;
