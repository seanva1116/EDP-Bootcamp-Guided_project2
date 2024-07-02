import { MongoClient, ObjectId } from 'mongodb';
import express from "express";
import dotenv from "dotenv";

dotenv.config();
const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
const charactersColl = process.env.CHARACTERS_COLLECTION;
const filmsColl = process.env.FILMS_COLLECTION;
const planetsColl = process.env.PLANETS_COLLECTION;

const PORT = 4000;
const app = express();
app.use(express.json());

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



// -------- defined routes -------- //
// get film's characters
app.get("/api/films/:id/characters", async (req, res) => {
    try {
        const filmId = new ObjectId(req.params.id); // getting the id of the film from the url 
        const filmCharacters = await dbName.connection('film_characters').find({_id: filmId}).toArray() // find related characters
        const characterIds = filmCharacters.map(fc => fc.character_id) // get ids of that film
        const characters = await db.collection('characters').find({_id: {$in: characterIds}}).toArray()
        res.json(characters)

        if(!film) {
            return res.status(404).send("film not found")
        }
        

    } catch (error) {
        console.log("Error occured: ", error);
        res.status(500).send("something went wrong")
    }
})

//get film's planets
app.get("/api/films/:id/planets", async (req, res) => {
    try {
        const filmId = new ObjectId(req.params.id); // getting the id of the film in mongoDB
        const filmPlanets = await dbName.connection('films_planets').find({_id: filmId}).toArray();
        const planetIds = filmPlanets.map(fp => fp.planet_id);
        const planets = await dbName.collection('planets').find({_id: {$in: planetIds}}).toArray();
        if(!film) {
            return res.status(404).send("film not found")
        }

        res.json(planets);

    } catch (error) {
        console.log("Error occured: ", error);
        res.status(500).send("something went wrong")
    }
})

//get characters' films
app.get("/api/characters/:id/films", async (req, res) => {
    try {
        //logic here
        const characterId = new ObjectId(req.params.id); //getting id
        const filmCharacters = await db.collection('film_collection').find({character_id: characterId}).toArray();
        const filmIds = filmCharacters.map(fc => fc.filmId);
        const films = await dbName.collection('films').find({ _id: {$in: filmIds}}).toArray();
        res.json(films);
        

    } catch (error) {
        console.log("Error occured: ", error);
        res.status(500).send("something went wrong")
    }
})

app.get("/api/planets/:id/films", async (req, res) => {
    try {
        //logic here
        const planetId = new ObjectId(req.params.id); //planet id from url
        const filmPlanet = await dbName.collection("film_planets").find({ planetId: planetId }).toArray();
        const filmIds = filmPlanet.map(fp => fp.film_id);
        const films = await dbName.collection('films').find({_id: {$in: filmIds}}).toArray();
        res.json(films);


    } catch (error) {
        console.log("Error occured: ", error);
        res.status(500).send("something went wrong")
    }
})

app.get("/api/planets/:id/characters", async (req, res) => {
    try {
        // logic here
    

    } catch (error) {
        console.log("Error occured: ", error);
        res.status(500).send("something went wrong")
    }
})
