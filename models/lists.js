const mongoose = require('mongoose');

// Creating a schema to interact with the databas
// How the table will look
// Lists is the only collection that needs a schema since we imported the csv files manually
const listSchema = new mongoose.Schema({
    playlist_name: {
        type: String,
        required: true,
        unique: true
    },
    total_duration: {
        default: 0,
        type: Number
    },
    no_tracks: {
        default: 0,
        type: Number
    },
    author:{
        type: String
    },
    tracks_list: {
        type: Number
    },
    private: {
        type: Boolean,
        default: true
    }
});

// Exporting and adding a name - Lists
module.exports = mongoose.model('Playlists', listSchema);