const ProjectService = require('../services/projectService');
const z = require('zod');

// Validering av prosjektdata
const projectSchema = z.object({
    title: z.string().min(1, 'Tittelen må være minst 1 tegn'),
    content: z.string().optional(), // Kan være tomt
    description: z.string().min(1, 'Beskrivelsen må være minst 1 tegn'),
    publishedAt: z.date(),
    status: z.string().min(1, 'Status må være angitt'),
    public: z.boolean(),
    link: z.string().url().optional(), // Kan være tomt og må være en gyldig URL hvis angitt
});

// Hent alle prosjekter
exports.getAllProjects = async (req, res) => {
    try {
        const projects = await ProjectService.getAllProjects();
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: 'Noe gikk galt.' });
    }
};

// Hent et prosjekt etter ID
exports.getProjectById = async (req, res) => {
    const { id } = req.params;
    try {
        const project = await ProjectService.getProjectById(id);
        if (!project) {
            return res.status(404).json({ error: 'Prosjekt ikke funnet.' });
        }
        res.json(project);
    } catch (error) {
        res.status(500).json({ error: 'Noe gikk galt.' });
    }
};

// Opprett et nytt prosjekt
exports.createProject = async (req, res) => {
    try {
        const validatedData = projectSchema.parse(req.body); // Valider prosjektdata
        const newProject = await ProjectService.createProject(validatedData);
        res.status(201).json(newProject);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ errors: error.errors });
        }
        res.status(500).json({ error: 'Noe gikk galt.' });
    }
};

// Oppdater et eksisterende prosjekt
exports.updateProject = async (req, res) => {
    const { id } = req.params;
    try {
        const validatedData = projectSchema.partial().parse(req.body); // Valider prosjektdata
        const updatedProject = await ProjectService.updateProject(id, validatedData);
        if (!updatedProject) {
            return res.status(404).json({ error: 'Prosjekt ikke funnet.' });
        }
        res.json(updatedProject);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ errors: error.errors });
        }
        res.status(500).json({ error: 'Noe gikk galt.' });
    }
};

// Slett et prosjekt
exports.deleteProject = async (req, res) => {
    const { id } = req.params;
    try {
        await ProjectService.deleteProject(id);
        res.status(204).send(); // Ingen innhold å sende tilbake
    } catch (error) {
        res.status(500).json({ error: 'Noe gikk galt.' });
    }
};
