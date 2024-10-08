import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const project = await prisma.project.create({
        data: {
            title: "Eksempel Prosjekt",
            description: "Dette er en beskrivelse av prosjektet.",
            publishedAt: new Date(),
            status: "Aktiv",
            tags: { create: [{ name: "tag1" }, { name: "tag2" }] }, // Oppdater til å bruke relasjonen
            public: true,
            link: "http://example.com"
        }
    });
    console.log('Prosjekt opprettet:', project);
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
