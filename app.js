const express = require('express');
const dotenv = require('dotenv');
import('node-fetch').then(fetchModule => {
    global.fetch = fetchModule.default;
});

dotenv.config();

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());  // Add this line to parse JSON bodies

app.post('/search', async (req, res) => {
    const searchValue = req.body.query;

    const apiKey = process.env.API_KEY;
    const url = `https://streaming-availability.p.rapidapi.com/v2/search/title?title=${searchValue}&country=us&output_language=en`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        res.json(data.result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
