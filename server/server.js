import express from "express";

const PORT = 4000;
const app = express();
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})