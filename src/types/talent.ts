import { EstadoTalento, Prisma } from '@/generated/prisma';

export interface GetAllTalentsParams {
    page?: number;
    limit?: number;
    sort?: 'asc' | 'desc';
    name?: string;
    seniority?: string;
    role?: string;
    status?: EstadoTalento;
}

export type TalentType = Prisma.TalentoGetPayload<{
    include: {
        lider: {
            select: {
                id: true;
                nombreYApellido: true;
            };
        };
        mentor: {
            select: {
                id: true;
                nombreYApellido: true;
            };
        };
        interacciones: {
            select: {
                id: true;
                tipoDeInteraccion: true;
                estado: true;
                fecha: true;
            };
        };
    };
}>;

// Extremely heavy in forms, search why. Is it because a bug?
export type CreateTalentInput = Prisma.TalentoCreateInput;
export type UpdateTalentInput = Prisma.TalentoUpdateInput;
