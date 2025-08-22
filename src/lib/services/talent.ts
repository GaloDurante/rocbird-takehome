import { prisma } from '@/lib/prisma';
import { GetAllTalentsParams, CreateTalentInput, UpdateTalentInput } from '@/types/talent';

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
        ...(role ? { rol: { contains: role, mode: 'insensitive' as const } } : {}),
        ...(status ? { estado: status } : {}),
    };

    const [talents, total] = await prisma.$transaction([
        prisma.talento.findMany({
            where,
            include: talentInclude,
            skip: (page - 1) * limit,
            take: limit,
            orderBy: { nombreYApellido: sort },
        }),
        prisma.talento.count({ where }),
    ]);

    return { talents, total };
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

export async function createTalent(data: CreateTalentInput) {
    return await prisma.talento.create({
        data,
    });
}

export async function updatedTalentById(id: number, data: UpdateTalentInput) {
    return await prisma.talento.update({
        where: { id },
        data,
    });
}
