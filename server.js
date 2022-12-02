// Adding dependencies
const express = require('express');
const app = express();
const router = express.Router();
const port = 3000;
const Playlist = require("./models/lists");

// Adding dependencies for updating, creating, and deleting playlists
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://luisdelotavo:lab4passAuthenticate@cluster0.tf6fh8d.mongodb.net/MusicInformation");


// Adding middleware
// Lets us use the body when sending requests
app.use(express.json());
router.use(express.json());

// Parses the request body
const bp = require("body-parser");
router.use(bp.json());
router.use(bp.urlencoded({ extended: true }));

// Installing the router object for the list requests
// Any express object that uses router will look like localhost:3000/lists/...
app.use("/lists", router);

// Connecting to the collection and adding it to a variable
const coll = require('./connect');

// Installing a router
app.get("/", (req, res) => {
    res.send("hi");
})

// Grabs a list of all the genres
app.get("/genres", async (req, res) => {

    // Data found is a cursor object and must be turned into an array
    let data = await coll.connectGenres();
    data = await data.find().toArray();
    res.send(data);
});

// Grabbing a specific artist with a given artist id
app.get("/artistsNo/:artist_id", async (req, res) => {
    const id = req.params.artist_id;
    let data = await coll.connectArtists();
    data = await data.findOne(
        { artist_id: id } );
    if (data) {
        res.send(data);
    }
    else {
        res.status(404).send(`Artist ${id} was not found!`);
    }
});

// Grabbing a specific track with a given track id
app.get("/trackNo/:track_id", async (req, res) => {
    const id = req.params.track_id;
    let data = await coll.connectTracks();
    data = await data.findOne(
        { track_id: id } );
    if (data) {
        res.send(data);
    }
    else {
        res.status(404).send(`Track ${id} was not found!`);
    }
});

// Grabbing a maximum of 5 track ids given a track name pattern
// Option i, allows for case-insensitivity
app.get("/trackName/:title", async (req, res) => {
    const id = req.params.title;
    let data = await coll.connectTracks();

    // Using Regex for pattern matching
    // Data found is a cursor object and must be turned into an array
    data = await data.find(
        { track_title: {$regex: id,$options:'i'} } ).toArray();
    data = data.slice(0,5);
    
    if (data) {
        res.send(data);
    }
    else {
        res.status(404).send(`No matches were found!`);
    }
})

// Grabbing a maximum of 5 track ids given an album name pattern
app.get("/albumName/:title", async (req, res) => {
    const id = req.params.title;
    let data = await coll.connectTracks();

    // Using Regex for pattern matching
    // Data found is a cursor object and must be turned into an array
    data = await data.find(
        { album_title: {$regex: id,$options:'i'} } ).toArray();
    data = data.slice(0,5);
    
    if (data) {
        res.send(data);
    }
    else {
        res.status(404).send(`No matches were found!`);
    }
});

// Grabbing a maximum of 5 track ids given an artist name pattern 
app.get("/artistName/:title", async (req, res) => {
    const id = req.params.title;
    let data = await coll.connectTracks();

    // Using Regex for pattern matching
    // Data found is a cursor object and must be turned into an array
    data = await data.find(
        { artist_name: {$regex: id,$options:'i'} } ).toArray();
    data = data.slice(0,5);
    
    if (data) {
        res.send(data);
    }
    else {
        res.status(404).send(`No matches were found!`);
    }
});

// Grabbing a maximum of 5 track ids given a genre name pattern
app.get("/genreName/:title", async (req, res) => {
    let id = req.params.title;
    id = "'genre_title': '" + id + "'";
    let data = await coll.connectTracks();

    // Using Regex for pattern matching
    // Data found is a cursor object and must be turned into an array
    data = await data.find(
        { track_genres: {$regex: id,$options:'i'} } ).toArray();
    data = data.slice(0,5);
    
    if (data) {
        res.send(data);
    }
    else {
        res.status(404).send(`No matches were found!`);
    }
});

// Grabbing all the matching artist ids given an artist name pattern
app.get("/matchingArtist/:name", async (req, res) => {
    const id = req.params.name;
    let data = await coll.connectArtists();

    // Using Regex for pattern matching
    // Data found in a cursor object and must be turned into an array
    data = await data.find(
        { artist_name: {$regex: id,$options:'i'} } ).toArray();
    
    if (data) {
        res.send(data);
    }
    else {
        res.status(404).send(`No matches were found!`);
    }
});


/* The following requests will use the router object instead, 
since we are dealing with the creation, update, and deletion of playlists */
// The following operations will look like localhost:3000/lists/...

// Post method to create a new playlist
router.post("/create", async (req, res) => {

    // Creating a new playlist entry, with the request body
    let data = new Playlist(req.body);
    try{
    const result = await data.save();
    res.send("Created playlist!");
    } catch {
        res.send("Error, playlist name already exists!");
    }
});

// Add track ids and the durations to a specific playlist
// Patch verb is for updating a resource
router.patch("/:playlist_name/add", async (req, res) => {

    // Grabbing the information from the user-input
    let id = req.params.playlist_name;
    let id_body = req.body;

    // Connecting to the collections
    let data = await coll.connectPlaylists();
    let dataTracks = await coll.connectTracks();

    // Searching through the tracks collection to find the track duration
    let inputted_track = JSON.stringify(req.body);
    inputted_track = inputted_track.replace(/\D/g, '');
    dataTracks = await dataTracks.find(
        { track_id: inputted_track } ).toArray();
    track_duration = dataTracks[0].track_duration;
    track_duration = parseFloat(track_duration.replace(":","."));

    // Will grab the current length of the playlist
    dataPlaylist = await data.find(
        { playlist_name: id } ).toArray();
    let n = dataPlaylist[0].tracks_list.length;

    // Will add the track to the playlist
    let result = data.updateOne(
        { playlist_name: id },
        { $push: id_body },
    );

    // Will add the time to the track inside the playlist
    let result2 = data.updateOne(
        { playlist_name: id },
        { $set: { [`tracks_list.${n}.length`]: track_duration } }
    )

    // Grab the current time of the playlist
    current_time = await data.find(
        { playlist_name: id } ).toArray();
    current_time = current_time[0].total_duration;
    current_time = current_time + track_duration;

    // Will update the total time of the playlist
    let result3 = data.updateOne(
        { playlist_name: id},
        { $set: { total_duration : current_time} }
    );

    res.send(`Added song to ${id}!`)
});

// Deleting an entire playlist
router.delete("/:playlist_name/delete", async (req, res) => {
    let id = req.params.playlist_name;
    let data = await coll.connectPlaylists();

    let result = data.deleteOne( {playlist_name: id} )
    res.send(`${id} has been deleted!`);
});

// Patch method to make the playlist either private or public
router.put("/:playlist_name/status", async (req, res) => {

    let id = req.params.playlist_name;
    let id_body = req.body;
    const data = await coll.connectPlaylists();

    let result = data.updateOne(
        { playlist_name: id },
        { $set: id_body }
    )
    res.send(`The status of ${id} has been changed!`)
});

// Add comments to each of the playlist
router.post("/:playlist_name/comment", async (req, res) => {

    let id = req.params.playlist_name;
    let id_body = req.body;
    const data = await coll.connectPlaylists();
    let result = data.updateOne(
        { playlist_name: id },
        { $push: id_body }
    )
    res.send(`Successfully added comment to ${id}!`);
});

// Get a list of the information in a given a playlist name
router.get("/:playlist_name/information", async (req, res) => {

    // Connecting to the playlist
    let id = req.params.playlist_name;
    let data = await coll.connectPlaylists();

    // Data found is a cursor object and must be turned into an array
    data = await data.find(
        { playlist_name: id } ).toArray();
    
    if (data) {
        res.send(data);
    }
    else {
        res.status(404).send(`No matches were found!`);
    }
});

// Gets a list of all the available playlists
router.get("/all", async (req, res) => {
    let data = await coll.connectPlaylists();
    data = await data.find( {private: false} ).toArray();

    // Return up to 10 public playlists
    data = data.slice(0,10);
    res.send(data);
});

// Listening to the port
app.listen(port, () => {
    console.log(`Listing on port ${port}`);
});