const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class ProjectRepository {
  async getAllProjects() {
    return await prisma.project.findMany();
  }

  async getProjectById(id) {
    return await prisma.project.findUnique({
      where: { id: Number(id) },
    });
  }

  async createProject(data) {
    return await prisma.project.create({ data });
  }
}

module.exports = new ProjectRepository();
