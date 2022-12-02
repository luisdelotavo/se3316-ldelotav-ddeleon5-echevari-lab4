const mongoose = require('mongoose');

// Creating a schema to interact with the databas
// How the table will look
// Lists is the only collection that needs a schema since users are creating an entry
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
        type: String,
        default: "user"
    },
    tracks_list: [
        {
        id: String,
        length: String }
    ],
    private: {
        type: Boolean,
        default: true
    },
    comments_list: [
        {
            commment: String,
            author_by: String,
            rating: Number
        }
    ]
});

// Exporting and adding a name - Lists
module.exports = mongoose.model('Playlists', listSchema);