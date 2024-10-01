const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Dummy project data
const projects = [
    {
        id: String(1),
        title: 'Nytt Prosjekt',
        description: 'Beskrivelse av nytt prosjekt',
        createdAt: '2024-09-01',
        publishedAt: '2024-09-05',
        status: 'completed',  // Nytt felt
        tags: ['development', 'web'],  // Nytt felt
        public: true,  // Nytt felt
        link: 'https://external-link.com',  // Nytt felt
        category: 'Utvikling'
    },
    {
        id: String(2),
        title: 'Annet Prosjekt',
        description: 'Beskrivelse av annet prosjekt',
        createdAt: '2024-09-02',
        publishedAt: '2024-09-05',
        status: 'in-progress',  // Nytt felt
        tags: ['design', 'UI/UX'],  // Nytt felt
        public: false,  // Nytt felt
        link: 'https://another-external-link.com',  // Nytt felt
        category: 'Design'
    },
];

// Route for projects
app.get('/projects', (req, res) => {
    res.json(projects);
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
