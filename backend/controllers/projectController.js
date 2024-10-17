const ProjectService = require('../services/projectService');
const z = require('zod');

// Validering av prosjektdata med Zod
const projectSchema = z.object({
    title: z.string().min(1, 'Tittelen må være minst 1 tegn'),
    content: z.string().optional(), // Kan være tomt
    description: z.string().min(1, 'Beskrivelsen må være minst 1 tegn'),
    publishedAt: z.preprocess((arg) => {
        // Sørg for at dato er korrekt formatert
        return arg ? new Date(arg) : undefined;
    }, z.date()),
    status: z.string().min(1, 'Status må være angitt'),
    public: z.boolean(),
    link: z.string().url().optional(), // Valider at URL er gyldig hvis angitt
});

// Hent alle prosjekter
exports.getAllProjects = async (req, res) => {
    try {
        console.log('Henter alle prosjekter...');
        const projects = await ProjectService.getAllProjects();
        console.log('Prosjekter funnet:', projects);
        res.json(projects);
    } catch (error) {
        console.error('Feil ved henting av prosjekter:', error); // Logg feilen
        res.status(500).json({ error: 'Noe gikk galt.' });
    }
};

// Hent et prosjekt etter ID
exports.getProjectById = async (req, res) => {
    const { id } = req.params;
    try {
        console.log(`Henter prosjekt med ID: ${id}`);
        const project = await ProjectService.getProjectById(id);
        if (!project) {
            return res.status(404).json({ error: 'Prosjekt ikke funnet.' });
        }
        res.json(project);
    } catch (error) {
        console.error(`Feil ved henting av prosjekt med ID ${id}:`, error); // Logg feilen
        res.status(500).json({ error: 'Noe gikk galt.' });
    }
};

// Opprett et nytt prosjekt
exports.createProject = async (req, res) => {
    try {
        console.log('Oppretter nytt prosjekt med data:', req.body);
        const validatedData = projectSchema.parse(req.body); // Valider prosjektdata
        const newProject = await ProjectService.createProject(validatedData);
        console.log('Nytt prosjekt opprettet:', newProject);
        res.status(201).json(newProject);
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error('Valideringsfeil ved oppretting av prosjekt:', error.errors);
            return res.status(400).json({ errors: error.errors });
        }
        console.error('Feil ved oppretting av prosjekt:', error); // Logg feilen
        res.status(500).json({ error: 'Noe gikk galt.' });
    }
};

// Oppdater et eksisterende prosjekt
exports.updateProject = async (req, res) => {
    const { id } = req.params;
    try {
        console.log(`Oppdaterer prosjekt med ID: ${id} med data:`, req.body);
        const validatedData = projectSchema.partial().parse(req.body); // Valider prosjektdata
        const updatedProject = await ProjectService.updateProject(id, validatedData);
        if (!updatedProject) {
            return res.status(404).json({ error: 'Prosjekt ikke funnet.' });
        }
        console.log('Prosjekt oppdatert:', updatedProject);
        res.json(updatedProject);
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error('Valideringsfeil ved oppdatering av prosjekt:', error.errors);
            return res.status(400).json({ errors: error.errors });
        }
        console.error(`Feil ved oppdatering av prosjekt med ID ${id}:`, error); // Logg feilen
        res.status(500).json({ error: 'Noe gikk galt.' });
    }
};

// Slett et prosjekt
exports.deleteProject = async (req, res) => {
    const { id } = req.params;
    try {
        console.log(`Sletter prosjekt med ID: ${id}`);
        await ProjectService.deleteProject(id);
        res.status(204).send(); // Ingen innhold å sende tilbake
    } catch (error) {
        console.error(`Feil ved sletting av prosjekt med ID ${id}:`, error); // Logg feilen
        res.status(500).json({ error: 'Noe gikk galt.' });
    }
};
