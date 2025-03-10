const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Proxy endpoint to forward requests to LibreTranslate API
app.post('/translate', async (req, res) => {
    const { text, source, target } = req.body;

    if (!text || !source || !target) {
        return res.status(400).json({ error: 'Missing required fields: text, source, or target.' });
    }

    const apiUrl = "https://libretranslate.com/translate";

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                q: text,
                source: source,
                target: target,
                format: "text",
            }),
        });

        const data = await response.json();
        if (data.translatedText) {
            res.json({ translation: data.translatedText });
        } else {
            res.status(500).json({ error: 'Translation failed.' });
        }
    } catch (error) {
        console.error("Error with translation:", error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Proxy server running on http://localhost:${port}`);
});
