import express from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

app.post('/search', async (req, res) => {
    const searchValue = req.body.query;
    const apiKey = process.env.API_KEY;

    const url = `https://streaming-availability.p.rapidapi.com/shows/search/title?country=us&title=${searchValue}&series_granularity=episode&output_language=en`;
    const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': 'streaming-availability.p.rapidapi.com'
    }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
