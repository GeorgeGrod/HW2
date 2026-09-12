import express from "express";

const app = express();
const PORT = 8000;
const HOST = 'localhost'

app.get('/health', (req, res) => {
    res.json({
        status: 'ok'
    });
});

app.get('/stats', (req, res) => {
    res.json({
        uptime: process.uptime(),
        nodeVersion: process.version,
        timestamp: new Date().toISOString()
    });
});

app.listen(PORT, () => {
    console.log(`Server started: http://${HOST}:${PORT}`);
});

