import { MongoClient, ObjectId } from 'mongodb';
import express from "express";
import dotenv from "dotenv";

dotenv.config();
const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
const charColl = process.env.CHARACTERs_COLLECTION;
const filmsColl = process.env.FILMS_COLLECTION;
const planetsColl = process.env.PLANETS_COLLECTION;

const PORT = 4000;
const app = express();
app.use(express.json());

app.get("/api/characters", async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(charColl);
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
        const collection = db.collection(charColl);
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

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});