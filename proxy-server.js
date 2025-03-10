import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

// Translation function using a free translation API (like Google Translate Web API)
async function translateText(text) {
    const apiUrl = "https://api.mymemory.translated.net/get";
    const targetLang = "de"; // German

    try {
        const response = await fetch(`${apiUrl}?q=${encodeURIComponent(text)}&langpair=en|${targetLang}`);
        const data = await response.json();
        if (data.responseData) {
            return data.responseData.translatedText;
        } else {
            throw new Error("Translation error");
        }
    } catch (error) {
        console.error("Translation API Error:", error);
        return "Error in translation.";
    }
}

app.get("/translate", async (req, res) => {
    const { text } = req.query;
    if (!text) {
        return res.status(400).json({ error: "Text not provided" });
    }

    const translatedText = await translateText(text);
    return res.json({ translation: translatedText });
});

app.listen(PORT, () => {
    console.log(`Ser
