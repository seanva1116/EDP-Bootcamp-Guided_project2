import express from "express";

const PORT = 4000;
const app = express();
app.use(express.json());

app.get("/api/planets", async (req, res) => {
    try {
        let dummyData = { Name: "test name", data: 42 };
        res.json(dummyData);
    }
    catch (e) {
        res.status(500).send(`Error: ${e}`);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});