import { PUT } from '@/app/api/talentos/[id]/route';
import { NextRequest } from 'next/server';
import { Prisma } from '@/generated/prisma';
import * as talentService from '@/lib/services/talent';

jest.mock('@/lib/services/talent');

const mockUpdateTalent = talentService.updatedTalentById as jest.Mock;

describe('PUT /api/talentos/[id]', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('Should update a talent and return 200', async () => {
        const mockData = {
            nombreYApellido: 'Juan Actualizado',
            estado: 'INACTIVO',
            seniority: 'Semi Senior',
            rol: 'Tester',
        };

        mockUpdateTalent.mockResolvedValueOnce({ id: 1, ...mockData });

        const req = new NextRequest('http://localhost:3000/api/talentos/1', {
            method: 'PUT',
            body: JSON.stringify(mockData),
        });

        const res = await PUT(req, { params: Promise.resolve({ id: '1' }) });
        const json = await res.json();

        expect(res.status).toBe(200);
        expect(json.message).toBe('Talento actualizado correctamente');
        expect(json.data).toEqual({ id: 1, ...mockData });
        expect(mockUpdateTalent).toHaveBeenCalledWith(1, mockData);
    });

    it('Should return 400 if ID is invalid', async () => {
        const req = new NextRequest('http://localhost:3000/api/talentos/abc', {
            method: 'PUT',
            body: JSON.stringify({ nombreYApellido: 'Algo' }),
        });

        const res = await PUT(req, { params: Promise.resolve({ id: 'abc' }) });
        const json = await res.json();

        expect(res.status).toBe(400);
        expect(json.message).toBe('ID inválido');
        expect(mockUpdateTalent).not.toHaveBeenCalled();
    });

    it('Should return 400 if validation fails (ZodError)', async () => {
        const invalidData = { nombreYApellido: '' };

        const req = new NextRequest('http://localhost:3000/api/talentos/1', {
            method: 'PUT',
            body: JSON.stringify(invalidData),
        });

        const res = await PUT(req, { params: Promise.resolve({ id: '1' }) });
        const json = await res.json();

        expect(res.status).toBe(400);
        expect(json.message).toBe('Datos inválidos');
        expect(Array.isArray(json.errors)).toBe(true);
        expect(mockUpdateTalent).not.toHaveBeenCalled();
    });

    it('Should return 404 if Prisma throws P2025 (talent not found)', async () => {
        const validData = {
            nombreYApellido: 'Juan Perez',
            estado: 'ACTIVO',
            seniority: 'Senior',
            rol: 'Developer',
        };

        mockUpdateTalent.mockRejectedValueOnce(
            new Prisma.PrismaClientKnownRequestError('Not found', {
                code: 'P2025',
                clientVersion: '4.x.x',
            }),
        );

        const req = new NextRequest('http://localhost:3000/api/talentos/999', {
            method: 'PUT',
            body: JSON.stringify(validData),
        });

        const res = await PUT(req, { params: Promise.resolve({ id: '999' }) });
        const json = await res.json();

        expect(res.status).toBe(404);
        expect(json.message).toBe('Talento no encontrado');
        expect(mockUpdateTalent).toHaveBeenCalledWith(999, validData);
    });

    it('Should return 400 if Prisma throws P2003 (foreign key fail)', async () => {
        const validData = {
            nombreYApellido: 'Juan Perez',
            estado: 'ACTIVO',
            seniority: 'Senior',
            rol: 'Developer',
            liderId: 999,
        };

        mockUpdateTalent.mockRejectedValueOnce(
            new Prisma.PrismaClientKnownRequestError('FK error', {
                code: 'P2003',
                clientVersion: '4.x.x',
            }),
        );

        const req = new NextRequest('http://localhost:3000/api/talentos/1', {
            method: 'PUT',
            body: JSON.stringify(validData),
        });

        const res = await PUT(req, { params: Promise.resolve({ id: '1' }) });
        const json = await res.json();

        expect(res.status).toBe(400);
        expect(json.message).toBe('El líder o mentor especificado no existe');
        expect(mockUpdateTalent).toHaveBeenCalledWith(1, validData);
    });

    it('Should return 500 if there is an unexpected error', async () => {
        const validData = {
            nombreYApellido: 'Juan Perez',
            estado: 'ACTIVO',
            seniority: 'Senior',
            rol: 'Developer',
        };

        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        mockUpdateTalent.mockRejectedValueOnce(new Error('Unexpected DB error'));

        const req = new NextRequest('http://localhost:3000/api/talentos/1', {
            method: 'PUT',
            body: JSON.stringify(validData),
        });

        const res = await PUT(req, { params: Promise.resolve({ id: '1' }) });
        const json = await res.json();

        expect(res.status).toBe(500);
        expect(json.message).toBe('Error interno del servidor');
        expect(mockUpdateTalent).toHaveBeenCalledWith(1, validData);

        consoleSpy.mockRestore();
    });
});
