import { prisma } from '@/lib/prisma';

async function main() {
    await prisma.referenteTecnico.createMany({
        data: [
            { nombreYApellido: 'Juan Pérez' },
            { nombreYApellido: 'María Gómez' },
            { nombreYApellido: 'Pedro López' },
            { nombreYApellido: 'Laura Martínez' },
        ],
    });

    const referentesDB = await prisma.referenteTecnico.findMany();

    const roles = ['Backend Developer', 'Frontend Developer', 'QA', 'Designer'];
    const seniorities = ['Junior', 'Semi Senior', 'Senior'];

    const talentosData = Array.from({ length: 20 }).map((_, i) => ({
        nombreYApellido: `Talento ${i + 1}`,
        seniority: seniorities[Math.floor(Math.random() * seniorities.length)],
        rol: roles[Math.floor(Math.random() * roles.length)],
        liderId: referentesDB[Math.floor(Math.random() * referentesDB.length)].id,
        mentorId: referentesDB[Math.floor(Math.random() * referentesDB.length)].id,
    }));

    await prisma.talento.createMany({ data: talentosData });

    const talentosDB = await prisma.talento.findMany();

    const tiposInteraccion = ['Entrevista Inicial', 'Revisión de Proyecto', 'Feedback', 'Onboarding'];

    const interaccionesData = talentosDB.flatMap((talento) =>
        Array.from({ length: Math.floor(Math.random() * 3) + 1 }).map(() => ({
            talentoId: talento.id,
            tipoDeInteraccion: tiposInteraccion[Math.floor(Math.random() * tiposInteraccion.length)],
            detalle: 'Detalle de ejemplo',
        })),
    );

    await prisma.interaccion.createMany({ data: interaccionesData });

    console.log('Seed ejecutada correctamente con 4 referentes, 20 talentos y sus interacciones');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
