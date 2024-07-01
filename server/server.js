import express, { json } from 'express'
import { promises as fs } from 'fs';

const app = express();
const port = 3010;

app.get('/', (req, res) => {
    res.send("hey there!")
})


app.listen(port, () => {
    console.log("listening on port 3010");
})


app.get("/api/planets", async (req, res) => {

    try {
        // Console log the entire request object
        console.log(req);

       const data = await fs.readFile('./planets.json', 'utf8');
       const jsonObj = JSON.parse(data);
       res.json(jsonObj);
   } catch (err) {
       console.error("Error:", err);
       res.status(404).send("no mathcing planets");
   }
})