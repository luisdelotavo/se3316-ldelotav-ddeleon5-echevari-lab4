const mongoose = require('mongoose');

// Creating a schema to interact with the databas
// How the table will look
const listSchema = new mongoose.Schema({
    list_name: {
        Type: String,
    },
    total_duration: {
        default: 0,
        Type: Number
    },
    no_tracks: {
        default: 0,
        Type: Number
    },
    author:{
        Type: String,
    },
    tracks_list: {
        Type: Number
    }
});

// Exporting and adding a name - Lists
module.exports = mongoose.model('Lists', listSchema);