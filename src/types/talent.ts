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

export type CreateTalentInput = Prisma.TalentoCreateInput;
