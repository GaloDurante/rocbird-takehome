import { POST } from '@/app/api/talentos/route';
import { NextRequest } from 'next/server';
import { Prisma } from '@/generated/prisma';
import * as talentService from '@/lib/services/talent';

jest.mock('@/lib/services/talent');

const mockCreateTalent = talentService.createTalent as jest.Mock;

describe('POST /api/talentos', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('Should create a new talent and return 201', async () => {
        const mockData = {
            nombreYApellido: 'Juan Perez',
            estado: 'ACTIVO',
            seniority: 'Senior',
            rol: 'Developer',
        };

        mockCreateTalent.mockResolvedValueOnce({ id: 1, ...mockData });

        const req = new NextRequest('http://localhost:3000/api/talentos', {
            method: 'POST',
            body: JSON.stringify(mockData),
        });

        const res = await POST(req);
        const json = await res.json();

        expect(res.status).toBe(201);
        expect(json.message).toBe('Talento creado correctamente');
        expect(json.data).toEqual({ id: 1, ...mockData });
        expect(mockCreateTalent).toHaveBeenCalledWith(mockData);
    });

    it('Should return 400 if validation fails (ZodError)', async () => {
        const invalidData = { nombreYApellido: '' };

        const req = new NextRequest('http://localhost:3000/api/talentos', {
            method: 'POST',
            body: JSON.stringify(invalidData),
        });

        const res = await POST(req);
        const json = await res.json();

        expect(res.status).toBe(400);
        expect(json.message).toBe('Datos inválidos');
        expect(Array.isArray(json.errors)).toBe(true);
        expect(mockCreateTalent).not.toHaveBeenCalled();
    });

    it('Should return 400 if Prisma throws P2003 error (foreign key fail)', async () => {
        const validData = {
            nombreYApellido: 'Juan Perez',
            estado: 'ACTIVO',
            seniority: 'Senior',
            rol: 'Developer',
            liderId: 999,
        };

        mockCreateTalent.mockRejectedValueOnce(
            new Prisma.PrismaClientKnownRequestError('FK error', {
                code: 'P2003',
                clientVersion: '4.x.x',
            }),
        );

        const req = new NextRequest('http://localhost:3000/api/talentos', {
            method: 'POST',
            body: JSON.stringify(validData),
        });

        const res = await POST(req);
        const json = await res.json();

        expect(res.status).toBe(400);
        expect(json.message).toBe('El líder o mentor especificado no existe');
        expect(mockCreateTalent).toHaveBeenCalledWith(validData);
    });

    it('Should return 500 if there is an unexpected error', async () => {
        const validData = {
            nombreYApellido: 'Juan Perez',
            estado: 'ACTIVO',
            seniority: 'Senior',
            rol: 'Developer',
        };

        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        mockCreateTalent.mockRejectedValueOnce(new Error('Unexpected DB error'));

        const req = new NextRequest('http://localhost:3000/api/talentos', {
            method: 'POST',
            body: JSON.stringify(validData),
        });

        const res = await POST(req);
        const json = await res.json();

        expect(res.status).toBe(500);
        expect(json.message).toBe('Error interno del servidor');
        expect(mockCreateTalent).toHaveBeenCalledWith(validData);

        consoleSpy.mockRestore();
    });
});
