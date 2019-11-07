const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userDataSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    }, 
    name: {
        type: String,
        required: true,
        trim: true,
    },   //need to add location type GeoLocation Object 
<<<<<<< Updated upstream
        //make dictionary of artist / song combos 
=======
    Song: {
        type: [],
        trim: true,
    }, 
    // Location: {
    //     type: <GeoJSON type> ,
    //     coordinates: <coordinates>,
    // },
>>>>>>> Stashed changes

}, {
    timestamps: true, // use some sort of time for login / sync not this one 
});

const UserData = mongoose.model('userData', userDataSchema);

module.exports = UserData;
