const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json()); // For å parse JSON-forespørsel

// REST API Endepunkter

// 1. Hent alle prosjekter
app.get('/api/projects', async (req, res) => {
    const projects = await prisma.project.findMany();
    res.json(projects);
});

// 2. Hent et prosjekt etter ID
app.get('/api/projects/:id', async (req, res) => {
    const { id } = req.params;
    const project = await prisma.project.findUnique({
        where: { id: Number(id) },
    });
    res.json(project);
});

// 3. Opprett et nytt prosjekt
app.post('/api/projects', async (req, res) => {
    const project = await prisma.project.create({
        data: req.body,
    });
    res.json(project);
});

// 4. Oppdater et eksisterende prosjekt
app.put('/api/projects/:id', async (req, res) => {
    const { id } = req.params;
    const updatedProject = await prisma.project.update({
        where: { id: Number(id) },
        data: req.body,
    });
    res.json(updatedProject);
});

// 5. Slett et prosjekt
app.delete('/api/projects/:id', async (req, res) => {
    const { id } = req.params;
    await prisma.project.delete({
        where: { id: Number(id) },
    });
    res.status(204).send(); // Ingen innhold å sende tilbake
});

// Start serveren
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Serveren kjører på port ${PORT}`);
});
