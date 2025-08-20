import { prisma } from '@/lib/prisma';
import { GetAllTalentsParams } from '@/types/talent';

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

export async function getAllTalents({
    page = 1,
    limit = 10,
    sort = 'asc',
    name,
    seniority,
    role,
    status,
}: GetAllTalentsParams) {
    const where = {
        ...(name ? { nombreYApellido: { contains: name, mode: 'insensitive' as const } } : {}),
        ...(seniority ? { seniority: { equals: seniority, mode: 'insensitive' as const } } : {}),
        ...(role ? { rol: { equals: role, mode: 'insensitive' as const } } : {}),
        ...(status ? { status } : {}),
    };

    return prisma.talento.findMany({
        where,
        include: talentInclude,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
            nombreYApellido: sort,
        },
    });
}

export async function getTalentById(id: number) {
    return prisma.talento.findUnique({
        where: { id },
        include: talentInclude,
    });
}

export async function deleteTalentById(id: number) {
    return await prisma.talento.deleteMany({
        where: { id },
    });
}
