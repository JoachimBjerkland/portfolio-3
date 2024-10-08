const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient(); // Oppretter prisma-instansen

// Hent alle prosjekter
exports.getAllProjects = async () => {
    return await prisma.project.findMany();
};

// Hent et prosjekt etter ID
exports.getProjectById = async (id) => {
    return await prisma.project.findUnique({
        where: { id: Number(id) },
    });
};

// Opprett et nytt prosjekt
exports.createProject = async (data) => {
    return await prisma.project.create({
        data,
    });
};

// Oppdater et eksisterende prosjekt
exports.updateProject = async (id, data) => {
    return await prisma.project.update({
        where: { id: Number(id) },
        data,
    });
};

// Slett et prosjekt
exports.deleteProject = async (id) => {
    return await prisma.project.delete({
        where: { id: Number(id) },
    });
};
