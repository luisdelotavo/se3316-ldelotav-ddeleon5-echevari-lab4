// Adding dependencies
const express = require('express');
const app = express();
const port = 3000;

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
app.get("/trackName/:title", async (req, res) => {
    const id = req.params.title;
    let data = await coll.connectTracks();

    // Using Regex for pattern matching
    // Data found is a cursor object and must be turned into an array
    data = await data.find(
        { track_title: {$regex: id} } ).toArray();
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
        { album_title: {$regex: id} } ).toArray();
    data = data.slice(0,5);
    
    if (data) {
        res.send(data);
    }
    else {
        res.status(404).send(`No matches were found!`);
    }
});

// Grabbing all the matching artist ids given an artist name pattern
app.get("/artistName/:name", async (req, res) => {
    const id = req.params.name;
    let data = await coll.connectArtists();

    // Using Regex for pattern matching
    // Data found in a cursor object and must be turned into an array
    data = await data.find(
        { artist_name: {$regex: id} } ).toArray();
    
    if (data) {
        res.send(data);
    }
    else {
        res.status(404).send(`No matches were found!`);
    }
});



// Listening to the port
app.listen(port, () => {
    console.log(`Listing on port ${port}`);
});