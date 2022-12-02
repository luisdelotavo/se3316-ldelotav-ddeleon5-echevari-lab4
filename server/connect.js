// Connecting to the database
const {MongoClient} = require('mongodb');
const url= "mongodb+srv://luisdelotavo:lab4passAuthenticate@cluster0.tf6fh8d.mongodb.net/test";
const databaseName = "MusicInformation";
const client = new MongoClient(url);

async function connectAlbums() {
    let result = await client.connect();
    db = result.db(databaseName);
    return db.collection("Albums"); ddd
}

async function connectGenres() {
    let result = await client.connect();
    db = result.db(databaseName);
    return db.collection("Genres");
}

async function connectArtists() {
    let result = await client.connect();
    db = result.db(databaseName);
    return db.collection("Artists");
}

async function connectTracks() {
    let result = await client.connect();
    db = result.db(databaseName);
    return db.collection("Tracks");
}

// Exporting so we can use this in other files
exports.connectGenres = connectGenres;
exports.connectAlbums = connectAlbums;
exports.connectArtists = connectArtists;
exports.connectTracks = connectTracks;
