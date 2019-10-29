const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ArtistSchema = new Schema({
    ArtistID: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    }, 

});
const Artist = mongoose.model('artist', ArtistSchema);
module.exports = Artist;
