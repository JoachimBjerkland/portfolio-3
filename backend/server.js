const express = require('express');
const cors = require('cors'); // Importer cors
const fs = require('fs').promises; // Importer fs med promises
const app = express();
const port = 5000;

// Bruk cors
app.use(cors());
app.use(express.json()); // For å håndtere JSON-forespørsler

// Hent data fra data.json
app.get('/api/data', async (req, res) => {
    try {
        const data = await fs.readFile('data.json', 'utf-8');
        res.json(JSON.parse(data)); // Returner JSON-data
    } catch (error) {
        res.status(500).json({ error: 'Failed to read data' });
    }
});

// Legg til data til data.json
app.post('/api/data', async (req, res) => {
    try {
        const newData = req.body; // Få data fra forespørselen
        const data = await fs.readFile('data.json', 'utf-8');
        const jsonData = JSON.parse(data);
        jsonData.push(newData); // Legg til ny data
        await fs.writeFile('data.json', JSON.stringify(jsonData, null, 2)); // Skriv data tilbake til fil
        res.status(201).json(newData); // Send tilbake den nye dataen
    } catch (error) {
        res.status(500).json({ error: 'Failed to save data' });
    }
});

// Rute for å hente prosjekter (dummy data)
app.get('/projects', async (req, res) => {
    const projects = [
        {
            id: 1,
            title: 'Prosjekt 1',
            description: 'Beskrivelse av prosjekt 1',
            createdAt: '2024-01-01',
            publishedAt: '2024-01-01',
            category: 'Webutvikling',
            status: 'Fullført',
            tags: ['React', 'Node.js'],
            externalLink: 'http://example.com'
        },
        // Legg til flere prosjekter her
    ];
    res.json(projects); // Returner prosjektene
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
