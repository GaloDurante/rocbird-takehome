import { NextResponse, NextRequest } from 'next/server';

import { getAllTalents } from '@/lib/services/talent';

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = req.nextUrl;

        const page = searchParams.get('page');
        const limit = searchParams.get('limit');
        const sort = searchParams.get('sort');
        const name = searchParams.get('name');
        const seniority = searchParams.get('seniority');
        const role = searchParams.get('rol');
        const status = searchParams.get('estado');

        const talents = await getAllTalents({
            page: page ? Math.max(1, Number(page)) : undefined,
            limit: limit ? Math.max(1, Number(limit)) : undefined,
            sort: sort === 'desc' ? 'desc' : 'asc',
            name: name ?? undefined,
            seniority: seniority ?? undefined,
            role: role ?? undefined,
            status: status === 'ACTIVO' || status === 'INACTIVO' ? status : undefined,
        });

        if (!talents.length) {
            return NextResponse.json({ message: 'No se encontró ningun talento' }, { status: 404 });
        }
        return NextResponse.json(talents, { status: 200 });
    } catch (error) {
        console.error('Error al buscar talentos:', error);
        return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
    }
}
