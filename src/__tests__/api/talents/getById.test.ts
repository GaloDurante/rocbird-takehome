import { GET } from '@/app/api/talentos/[id]/route';
import { NextRequest } from 'next/server';
import * as talentService from '@/lib/services/talent';

jest.mock('@/lib/services/talent');

const mockGetTalentById = talentService.getTalentById as jest.Mock;

describe('GET /api/talentos/[id]', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('Must return selected talent with status 200', async () => {
        mockGetTalentById.mockResolvedValueOnce({
            id: 1,
            nombreYApellido: 'Juan Perez',
            estado: 'ACTIVO',
            lider: null,
            mentor: null,
            interacciones: [],
        });

        const req = new NextRequest('http://localhost:3000/api/talentos/1');
        const res = await GET(req, { params: Promise.resolve({ id: '1' }) });
        const json = await res.json();

        expect(res.status).toBe(200);
        expect(json).toBeDefined();
        expect(json.id).toBe(1);
        expect(json.nombreYApellido).toBe('Juan Perez');
        expect(mockGetTalentById).toHaveBeenCalledWith(1);
    });

    it('Must return 400 if ID is invalid', async () => {
        const req = new NextRequest('http://localhost:3000/api/talentos/abc');
        const res = await GET(req, { params: Promise.resolve({ id: 'abc' }) });
        const json = await res.json();

        expect(res.status).toBe(400);
        expect(json.message).toBe('ID inválido');
        expect(mockGetTalentById).not.toHaveBeenCalled();
    });

    it('Must return 404 if talent not found', async () => {
        mockGetTalentById.mockResolvedValueOnce(null);

        const req = new NextRequest('http://localhost:3000/api/talentos/99');
        const res = await GET(req, { params: Promise.resolve({ id: '99' }) });
        const json = await res.json();

        expect(res.status).toBe(404);
        expect(json).toEqual({ message: 'Talento no encontrado' });
        expect(mockGetTalentById).toHaveBeenCalledWith(99);
    });

    it('Must return 500 if there is an internal error', async () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        mockGetTalentById.mockRejectedValueOnce(new Error('DB error'));

        const req = new NextRequest('http://localhost:3000/api/talentos/2');
        const res = await GET(req, { params: Promise.resolve({ id: '2' }) });
        const json = await res.json();

        expect(res.status).toBe(500);
        expect(json).toEqual({ message: 'Error interno del servidor' });

        consoleSpy.mockRestore();
    });
});
