import { NextResponse, NextRequest } from 'next/server';

import { getTalentById } from '@/lib/services/talent';

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;

        if (isNaN(Number(id))) {
            return NextResponse.json({ message: 'ID inválido' }, { status: 400 });
        }

        const talent = await getTalentById(Number(id));

        if (!talent) {
            return NextResponse.json({ message: 'Talento no encontrado' }, { status: 404 });
        }

        return NextResponse.json(talent, { status: 200 });
    } catch (error) {
        console.error('Error al buscar talento:', error);
        return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
    }
}
