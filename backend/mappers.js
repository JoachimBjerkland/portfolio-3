// backend/mappers.js
function mapProjectToDatabase(project) {
    return {
        title: project.title,
        description: project.description,
        publishedAt: new Date(project.publishedAt), // transformasjon
        // legg til flere felt etter behov
    };
}

function mapDatabaseToProject(dbProject) {
    return {
        title: dbProject.title,
        description: dbProject.description,
        publishedAt: dbProject.publishedAt.toISOString(), // transformasjon
        // legg til flere felt etter behov
    };
}

module.exports = { mapProjectToDatabase, mapDatabaseToProject };
