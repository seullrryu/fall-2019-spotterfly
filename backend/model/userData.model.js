const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userDataSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },

}, {
    timestamps: true,
});

const UserData = mongoose.model('userData', userDataSchema);

module.exports = UserData;
