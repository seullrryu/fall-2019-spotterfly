const mongoose = require('mongoose');
const Schema = mongoose.Schema;

function getArtistSchema() {
    return {
        ArtistID: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        Name: {
            type: String,
            required: false,
            unique: false,
            trim: true,
        }
        

    };
}

const ArtistSchema = new Schema(getArtistSchema());
const Artist = mongoose.model('artist', ArtistSchema);
module.exports = {
    Artist,
    getArtistSchema
};