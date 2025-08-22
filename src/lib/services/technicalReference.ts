import { prisma } from '@/lib/prisma';

export async function getAllTechnicalReferences() {
    return prisma.referenteTecnico.findMany({
        select: {
            id: true,
            nombreYApellido: true,
        },
    });
}
