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
    let data = await coll.connectGenres();
    data = await data.find().toArray();
    res.send(data);
});

// Grabbing a specific artist with a given artist id
app.get("/artists/:artist_id", async (req, res) => {
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
app.get("/track/:track_id", async (req, res) => {
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

// Grabbing a maximum of 5 search results given a track/album name pattern
app.get("/results/:pattern_id", async (req, res) => {
    const id = req.params.pattern_id;
    res.send(id);
})


// Listening to the port
app.listen(port, () => {
    console.log(`Listing on port ${port}`);
});