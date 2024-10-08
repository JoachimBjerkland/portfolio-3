const express = require('express');
const cors = require('cors');
const ProjectController = require('./controllers/projectController');

const app = express();
app.use(cors());
app.use(express.json()); // Middleware for å parse JSON-forespørsel

// REST API Endepunkter

// Hent alle prosjekter
app.get('/api/projects', ProjectController.getAllProjects);

// Hent et prosjekt etter ID
app.get('/api/projects/:id', ProjectController.getProjectById);

// Opprett et nytt prosjekt
app.post('/api/projects', ProjectController.createProject);

// Oppdater et eksisterende prosjekt
app.put('/api/projects/:id', ProjectController.updateProject);

// Slett et prosjekt
app.delete('/api/projects/:id', ProjectController.deleteProject);

// Start serveren
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Serveren kjører på port ${PORT}`);
});
