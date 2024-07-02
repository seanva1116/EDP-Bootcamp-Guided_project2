import { MongoClient, ObjectId } from 'mongodb';
import express from "express";
import dotenv from "dotenv";
import cors from 'cors';

dotenv.config();
const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
const charactersColl = process.env.CHARACTERS_COLLECTION;
const filmsColl = process.env.FILMS_COLLECTION;
const planetsColl = process.env.PLANETS_COLLECTION;
const filmsCharacters = process.env.FILMS_CHARACTERS;
const filmsPlanets = process.env.FILMS_PLANETS;

const PORT = 4000;
const app = express();
app.use(cors());
app.use(express.json());

// -------- defined routes -------- //
app.get("/api/characters", async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(charactersColl);
        const characters = await collection.find({}).toArray();
        res.json(characters);
    }
    catch (e) {
        res.status(500).send(`Error fetching characters: ${e}`);
    }
});

app.get("/api/films", async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(filmsColl);
        const films = await collection.find({}).toArray();
        res.json(films);
    }
    catch (e) {
        res.status(500).send(`Error fetching films: ${e}`);
    }
});

app.get("/api/planets", async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(planetsColl);
        const planets = await collection.find({}).toArray();
        res.json(planets);
    }
    catch (e) {
        res.status(500).send(`Error fetching characters: ${e}`);
    }
});

app.get("/api/characters/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(charactersColl);
        const character = await collection.find({"id": parseInt(id)}).toArray();
        res.json(character);
    }
    catch (e) {
        res.status(500).send(`Error fetching character: ${e}`);
    }
});

app.get("/api/films/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(filmsColl);
        const films = await collection.find({"id": parseInt(id)}).toArray();
        res.json(films);
    }
    catch (e) {
        res.status(500).send(`Error fetching character: ${e}`);
    }
});

app.get("/api/planets/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(planetsColl);
        const planets = await collection.find({"id": parseInt(id)}).toArray();
        res.json(planets);
    }
    catch (e) {
        res.status(500).send(`Error fetching character: ${e}`);
    }
});

// get film's characters
app.get("/api/films/:id/characters", async (req, res) => {
    try {
        const { id } = req.params; // get id
        const client = await MongoClient.connect(url); //connect to db
        const db = client.db(dbName);
        var collection = db.collection(filmsCharacters); //getting collection
        const characterIds = await collection.find({"film_id":parseInt(id)}).toArray();
        console.log(characterIds);

        var characterIdArray = [];
        for(var charId in characterIds)
            characterIdArray.push(characterIds[charId].character_id);
        collection = db.collection(charactersColl);
        const characters = await collection.find({"id":{ $in : characterIdArray}}).toArray();
        res.json(characters);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Couldn't load");
    }
});


app.get("/api/films/:id/planets", async (req, res) => {
    try {
        const { id } = req.params; // get id
        const client = await MongoClient.connect(url); //connect to db
        const db = client.db(dbName);
        var collection = db.collection(filmsPlanets); //getting collection
        const planetIds = await collection.find({"film_id":parseInt(id)}).toArray();
        console.log(planetIds);

        var planetIdArray = [];
        for(var planetId in planetIds)
            planetIdArray.push(planetIds[planetId].planet_id);
        collection = db.collection(planetsColl);
        const planets = await collection.find({"id":{ $in : planetIdArray}}).toArray();

        res.json(planets);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Couldn't load");
    }
});

//get characters' films
app.get("/api/characters/:id/films", async (req, res) => {
    try {
        const { id } = req.params; // get id
        const client = await MongoClient.connect(url); //connect to db
        const db = client.db(dbName);
        var collection = db.collection(filmsCharacters); //getting collection
        const filmIds = await collection.find({"character_id":parseInt(id)}).toArray();
        console.log(filmIds);

        var filmIdArray = [];
        for(var filmId in filmIds)
            filmIdArray.push(filmIds[filmId].film_id);
        collection = db.collection(filmsColl);
        const films = await collection.find({"id":{ $in : filmIdArray}}).toArray();
        res.json(films);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Couldn't load");
    }
});

app.get("/api/planets/:id/films", async (req, res) => {
    try {
        const { id } = req.params; // get id
        const client = await MongoClient.connect(url); //connect to db
        const db = client.db(dbName);
        var collection = db.collection(filmsPlanets); //getting collection
        const filmIds = await collection.find({"planet_id":parseInt(id)}).toArray();
        console.log(filmIds);

        var filmIdArray = [];
        for(var filmId in filmIds)
            filmIdArray.push(filmIds[filmId].film_id);
        collection = db.collection(filmsColl);
        const films = await collection.find({"id":{ $in : filmIdArray}}).toArray();
        res.json(films);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Couldn't load");
    }
});

app.get("/api/planets/:id/characters", async (req, res) => {
    try {
        const { id } = req.params;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(charactersColl);
        const characters = await collection.find({"homeworld": parseInt(id)}).toArray();
        res.json(characters);
    }
    catch (e) {
        res.status(500).send(`Error fetching character: ${e}`);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});