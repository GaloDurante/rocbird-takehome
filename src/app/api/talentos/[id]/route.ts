import { NextResponse, NextRequest } from 'next/server';
import { ZodError } from 'zod';
import { Prisma } from '@/generated/prisma';

import { updateTalentSchema } from '@/lib/validations/talent';
import { getTalentById, deleteTalentById, updatedTalentById } from '@/lib/services/talent';

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

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;

        if (isNaN(Number(id))) {
            return NextResponse.json({ message: 'ID inválido' }, { status: 400 });
        }

        const deleted = await deleteTalentById(Number(id));

        if (deleted.count === 0) {
            return NextResponse.json({ message: 'Talento no encontrado' }, { status: 404 });
        }

        return NextResponse.json(
            { message: `Talento eliminado correctamente`, deletedCount: deleted.count },
            { status: 200 },
        );
    } catch (error) {
        console.error('Error al eliminar talento:', error);
        return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;

        if (isNaN(Number(id))) {
            return NextResponse.json({ message: 'ID inválido' }, { status: 400 });
        }

        const body = await req.json();
        const parsedData = updateTalentSchema.parse(body);

        const updatedTalent = await updatedTalentById(Number(id), parsedData);

        return NextResponse.json(
            {
                message: 'Talento actualizado correctamente',
                data: updatedTalent,
            },
            { status: 200 },
        );
    } catch (error) {
        if (error instanceof ZodError) {
            const errorMessages = error.issues.map((e) => e.message);
            return NextResponse.json({ message: 'Datos inválidos', errors: errorMessages }, { status: 400 });
        }

        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code == 'P2025') {
            return NextResponse.json({ message: 'Talento no encontrado' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
    }
}
