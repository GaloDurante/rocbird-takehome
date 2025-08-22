import { getAllTechnicalReferences } from '@/lib/services/technicalReference';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

import TalentForm from '@/components/TalentForm';

export default async function NewTalentPage() {
    const technicalReferences = await getAllTechnicalReferences();

    return (
        <div className="min-h-screen flex flex-col justify-center items-center p-4 md:p-8">
            <Button asChild variant="outline" className="absolute top-4 left-4">
                <Link href="/talentos">Volver</Link>
            </Button>
            <div className="w-full xl:max-w-7/12 shadow-md rounded-lg p-6 md:p-10">
                <h1 className="text-2xl font-bold mb-2">Crear nuevo talento</h1>
                <p className="text-muted-foreground mb-6">
                    Complete el formulario a continuación para registrar un nuevo talento en el sistema.
                </p>

                <TalentForm technicalReferences={technicalReferences} />
            </div>
        </div>
    );
}
