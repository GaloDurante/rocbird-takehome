import { getAllTechnicalReferences } from '@/lib/services/technicalReference';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

import TalentForm from '@/components/TalentForm';
import { getTalentById } from '@/lib/services/talent';

interface TalentPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function TalentPage({ params }: TalentPageProps) {
    const { id } = await params;
    const talent = await getTalentById(Number(id));
    if (!talent)
        return (
            <div className="min-h-screen flex flex-col justify-center items-center p-4 md:p-8">
                <Button asChild variant="outline" className="absolute top-4 left-4">
                    <Link href="/talentos">Volver</Link>
                </Button>
                <h1 className="text-2xl font-bold mb-2 text-center">Talento no encontrado</h1>
                <p className="text-muted-foreground mb-6 text-center">
                    No se encontró ningún talento con los datos proporcionados. Por favor, verifique la información o
                    cree un nuevo talento.
                </p>
            </div>
        );

    const technicalReferences = await getAllTechnicalReferences();

    return (
        <div className="min-h-screen flex flex-col justify-center items-center p-4 md:p-8">
            <Button asChild variant="outline" className="absolute top-4 left-4">
                <Link href="/talentos">Volver</Link>
            </Button>
            <div className="w-full xl:max-w-7/12 shadow-md rounded-lg p-6 md:p-10">
                <h1 className="text-2xl font-bold mb-2">Editar talento</h1>
                <p className="text-muted-foreground mb-6">
                    Complete el formulario a continuación para editar los campos de un talento existente.
                </p>

                <TalentForm technicalReferences={technicalReferences} isEdit selectedTalent={talent} />
            </div>
        </div>
    );
}
