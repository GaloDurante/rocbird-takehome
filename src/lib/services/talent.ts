import { prisma } from '@/lib/prisma';

const talentInclude = {
    lider: {
        select: {
            id: true,
            nombreYApellido: true,
        },
    },
    mentor: {
        select: {
            id: true,
            nombreYApellido: true,
        },
    },
    interacciones: {
        select: {
            id: true,
            tipoDeInteraccion: true,
            estado: true,
            fecha: true,
        },
    },
};

export async function getAllTalents() {
    return prisma.talento.findMany({
        include: talentInclude,
    });
}

export async function getTalentById(id: number) {
    return prisma.talento.findUnique({
        where: { id },
        include: talentInclude,
    });
}
