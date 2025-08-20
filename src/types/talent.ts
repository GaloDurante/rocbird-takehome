import { EstadoTalento } from '@/generated/prisma';

export interface GetAllTalentsParams {
    page?: number;
    limit?: number;
    sort?: 'asc' | 'desc';
    name?: string;
    seniority?: string;
    role?: string;
    status?: EstadoTalento;
}
