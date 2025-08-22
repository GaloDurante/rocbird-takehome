'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteTalentByIdAction } from '@/lib/actions/talent';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Pencil, Trash } from 'lucide-react';
import Link from 'next/link';

interface TableActionButtonsProps {
    talentId: number;
    talentName: string;
}

export default function TableActionButtons({ talentId, talentName }: TableActionButtonsProps) {
    const router = useRouter();
    const [inputValue, setInputValue] = useState('');
    const confirmationText = 'eliminar-talento-' + talentId;

    const handleDelete = async () => {
        try {
            const result = await deleteTalentByIdAction(talentId);
            toast.success(result.message);
            router.refresh();
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            }
        }
    };

    return (
        <>
            <Button size="icon" variant="outline" asChild>
                <Link href={`/talentos/${talentId}`}>
                    <Pencil />
                </Link>
            </Button>

            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button size="icon" variant="destructive" className="cursor-pointer">
                        <Trash />
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirmar eliminación</AlertDialogTitle>
                        <AlertDialogDescription>
                            ¿Estás seguro de que quieres eliminar a{' '}
                            <span className="font-semibold text-foreground">{talentName}</span>? Esta acción no se puede
                            deshacer.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <div className="mb-2">
                        <label className="block text-muted-foreground text-sm mb-2">
                            Debe escribir{' '}
                            <span className="font-semibold text-foreground">{`"${confirmationText}"`}</span> para
                            confirmar:
                        </label>
                        <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                    </div>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="cursor-pointer">Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                            className="cursor-pointer disabled:cursor-default"
                            onClick={handleDelete}
                            disabled={inputValue !== confirmationText}
                        >
                            Eliminar
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
