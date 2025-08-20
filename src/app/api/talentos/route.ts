import { NextResponse } from 'next/server';

import { getAllTalents } from '@/lib/services/talent';

export async function GET() {
    try {
        const talents = await getAllTalents();
        if (!talents.length) {
            return NextResponse.json({ message: 'No se encontró ningun talento' }, { status: 404 });
        }
        return NextResponse.json(talents, { status: 200 });
    } catch (error) {
        console.error('Error al buscar talentos:', error);
        return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
    }
}
