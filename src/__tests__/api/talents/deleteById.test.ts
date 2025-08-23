import { DELETE } from '@/app/api/talentos/[id]/route';
import { NextRequest } from 'next/server';
import * as talentService from '@/lib/services/talent';

jest.mock('@/lib/services/talent');

const mockDeleteTalentById = talentService.deleteTalentById as jest.Mock;

describe('DELETE /api/talentos/[id]', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('Must return 400 if ID is invalid', async () => {
        const req = new NextRequest('http://localhost:3000/api/talentos/abc');
        const res = await DELETE(req, { params: Promise.resolve({ id: 'abc' }) });
        const json = await res.json();

        expect(res.status).toBe(400);
        expect(json.message).toBe('ID inválido');
        expect(mockDeleteTalentById).not.toHaveBeenCalled();
    });

    it('Must return 404 if talent not found', async () => {
        mockDeleteTalentById.mockResolvedValueOnce({ count: 0 });

        const req = new NextRequest('http://localhost:3000/api/talentos/99');
        const res = await DELETE(req, { params: Promise.resolve({ id: '99' }) });
        const json = await res.json();

        expect(res.status).toBe(404);
        expect(json).toEqual({ message: 'Talento no encontrado' });
        expect(mockDeleteTalentById).toHaveBeenCalledWith(99);
    });

    it('Must return 200 if talent is deleted successfully', async () => {
        mockDeleteTalentById.mockResolvedValueOnce({ count: 1 });

        const req = new NextRequest('http://localhost:3000/api/talentos/1');
        const res = await DELETE(req, { params: Promise.resolve({ id: '1' }) });
        const json = await res.json();

        expect(res.status).toBe(200);
        expect(json).toEqual({ message: 'Talento eliminado correctamente', deletedCount: 1 });
        expect(mockDeleteTalentById).toHaveBeenCalledWith(1);
    });

    it('Must return 500 if there is an internal error', async () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        mockDeleteTalentById.mockRejectedValueOnce(new Error('DB fail'));

        const req = new NextRequest('http://localhost:3000/api/talentos/2');
        const res = await DELETE(req, { params: Promise.resolve({ id: '2' }) });
        const json = await res.json();

        expect(res.status).toBe(500);
        expect(json).toEqual({ message: 'Error interno del servidor' });

        consoleSpy.mockRestore();
    });
});
