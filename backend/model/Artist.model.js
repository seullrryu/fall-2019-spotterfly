const mongoose = require('mongoose');
const Schema = mongoose.Schema;

function getArtistSchema() {
    return {
        SongID: { //unique song id 
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        SongName: {
            type: String, //
            required: false,
            unique: false,
            trim: true,
        },
        Artist: {
            type: String,
            required: false,
            unique: false,
            trim: true,
        },
    };
}

const ArtistSchema = new Schema(getArtistSchema());
const Artist = mongoose.model('artist', ArtistSchema);
module.exports = {
    Artist,
    getArtistSchema
};