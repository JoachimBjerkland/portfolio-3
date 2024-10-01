const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// Dummy project data
const projects = [
    {
        id: String(1),
        title: 'Nytt Prosjekt',
        description: 'Beskrivelse av nytt prosjekt',
        createdAt: '2024-09-01',
        publishedAt: '2024-09-05',
        status: 'completed',
        tags: ['development', 'web'],
        public: true,
        link: 'https://external-link.com',
        category: 'Utvikling',
        demos: [],
        files: [],
        author: {
            name: 'Halgeir Geirson',
            bio: 'Student og utvikler fra HiOF.'
        }
    },
    {
        id: String(2),
        title: 'Annet Prosjekt',
        description: 'Beskrivelse av annet prosjekt',
        createdAt: '2024-09-02',
        publishedAt: '2024-09-05',
        status: 'in-progress',
        tags: ['design', 'UI/UX'],
        public: false,
        link: 'https://another-external-link.com',
        category: 'Design',
        demos: [],
        files: [],
        author: {
            name: 'Anna Design',
            bio: 'UI/UX designer med flere års erfaring.'
        }
    }
];

// Route for projects with role-based access
app.get('/projects', (req, res) => {
    const role = req.cookies['user.role']; // Hent brukerens rolle fra cookie
    let filteredProjects;

    if (role === 'admin') {
        filteredProjects = projects; // Admin ser alle prosjekter
    } else {
        // Andre brukere ser kun offentlige prosjekter
        filteredProjects = projects.filter(project => project.public);
    }

    res.json(filteredProjects);
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
