import express from "express";

const app = express();
const PORT = 8000;

app.get('/timestamp', (req, res) => {
    res.json({timestamp: new Date()})
})

app.listen(PORT, () => {
    console.log(`Server started: http://localhost:${PORT}`);
});

