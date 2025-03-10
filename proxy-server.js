import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

// Proxy Endpoint for English Homework
app.get("/homework", async (req, res) => {
    const homeworkTopic = req.query.topic;
    if (!homeworkTopic) {
        return res.status(400).json({ error: "No homework topic provided" });
    }

    try {
        // Replace this URL with an actual English homework API URL if available
        const apiUrl = `https://api.some-english-homework.com/assignments?topic=${homeworkTopic}`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(`API Error: ${JSON.stringify(data)}`);
        }

        res.json(data); // Send the homework data to the client
    } catch (error) {
        console.error("Homework API Error:", error);
        res.status(500).json({ error: "Failed to fetch homework information" });
    }
});

app.listen(PORT, () => {
    console.log(`Proxy server running on port ${PORT}`);
});
