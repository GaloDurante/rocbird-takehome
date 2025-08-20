import { prisma } from '@/lib/prisma';

async function main() {
    const lider = await prisma.referenteTecnico.create({
        data: { nombreYApellido: 'Juan Pérez' },
    });

    const mentor = await prisma.referenteTecnico.create({
        data: { nombreYApellido: 'María Gómez' },
    });

    const talento1 = await prisma.talento.create({
        data: {
            nombreYApellido: 'Carlos Sánchez',
            seniority: 'Junior',
            rol: 'Backend Developer',
            estado: 'ACTIVO',
            liderId: lider.id,
            mentorId: mentor.id,
        },
    });

    const talento2 = await prisma.talento.create({
        data: {
            nombreYApellido: 'Ana Torres',
            seniority: 'Semi Senior',
            rol: 'Frontend Developer',
            estado: 'ACTIVO',
            liderId: lider.id,
            mentorId: mentor.id,
        },
    });

    await prisma.interaccion.createMany({
        data: [
            {
                tipoDeInteraccion: 'Entrevista Inicial',
                detalle: 'Primera charla técnica',
                estado: 'INICIADA',
                talentoId: talento1.id,
            },
            {
                tipoDeInteraccion: 'Revisión de Proyecto',
                detalle: 'Evaluación de coding challenge',
                estado: 'EN_PROGRESO',
                talentoId: talento2.id,
            },
        ],
    });

    console.log('Seed ejecutada correctamente');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
