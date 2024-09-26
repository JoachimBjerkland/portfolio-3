const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

// Middleware
app.use(cors()); // Aktiver CORS for alle ruter
app.use(express.json());

// Dummy prosjektdata
const projects = [
  { id: '1', title: 'Nytt Prosjekt', description: 'Beskrivelse av nytt prosjekt' }, // Endret id til string
  { id: '2', title: 'Annet Prosjekt', description: 'Beskrivelse av annet prosjekt' }, // Endret id til string
];

// Rute for prosjekter
app.get('/projects', (req, res) => {
  res.json(projects);
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
