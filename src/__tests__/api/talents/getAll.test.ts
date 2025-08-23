import { GET } from '@/app/api/talentos/route';
import { NextRequest } from 'next/server';
import * as talentService from '@/lib/services/talent';

jest.mock('@/lib/services/talent');

const mockGetAllTalents = talentService.getAllTalents as jest.Mock;

describe('GET /api/talentos', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('Must return talent list with status 200', async () => {
        mockGetAllTalents.mockResolvedValueOnce({
            talents: [
                {
                    id: 1,
                    nombreYApellido: 'Juan Perez',
                    estado: 'ACTIVO',
                    lider: null,
                    mentor: null,
                    interacciones: [],
                },
            ],
            total: 1,
        });

        const req = new NextRequest('http://localhost:3000/api/talentos');
        const res = await GET(req);
        const json = await res.json();

        expect(res.status).toBe(200);
        expect(json.talents).toHaveLength(1);
        expect(json.total).toBe(1);
        expect(json.talents[0].nombreYApellido).toBe('Juan Perez');
        expect(mockGetAllTalents).toHaveBeenCalled();
    });

    it('Must return 404 if no talents', async () => {
        mockGetAllTalents.mockResolvedValueOnce({ talents: [], total: 0 });

        const req = new NextRequest('http://localhost:3000/api/talentos');
        const res = await GET(req);
        const json = await res.json();

        expect(res.status).toBe(404);
        expect(json.message).toBe('No se encontró ningun talento');
        expect(mockGetAllTalents).toHaveBeenCalled();
    });

    it('Must return 500 on internal error', async () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        mockGetAllTalents.mockRejectedValueOnce(new Error('DB fail'));

        const req = new NextRequest('http://localhost:3000/api/talentos');
        const res = await GET(req);
        const json = await res.json();

        expect(res.status).toBe(500);
        expect(json.message).toBe('Error interno del servidor');

        consoleSpy.mockRestore();
    });
});
