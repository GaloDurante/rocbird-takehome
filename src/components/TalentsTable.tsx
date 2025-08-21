import { TalentType } from '@/types/talent';

import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Pencil, Trash } from 'lucide-react';

interface TalentsTableProps {
    talents: TalentType[];
}

export default function TalentsTable({ talents }: TalentsTableProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow className="bg-muted/30">
                    <TableHead>Name</TableHead>
                    <TableHead>Seniority</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Lider asociado</TableHead>
                    <TableHead>Mentor asociado</TableHead>
                    <TableHead>Interacciones</TableHead>
                    <TableHead>Acciones</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {talents.map((t) => (
                    <TableRow key={t.id}>
                        <TableCell>{t.nombreYApellido}</TableCell>
                        <TableCell>{t.seniority}</TableCell>
                        <TableCell>{t.rol}</TableCell>
                        <TableCell>
                            <span
                                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                    t.estado === 'ACTIVO' ? 'bg-green-800 text-white' : 'bg-red-800 text-white'
                                }`}
                            >
                                {t.estado}
                            </span>
                        </TableCell>
                        <TableCell>{t.lider?.nombreYApellido || '-'}</TableCell>
                        <TableCell>{t.mentor?.nombreYApellido || '-'}</TableCell>
                        <TableCell>{t.interacciones.length}</TableCell>
                        <TableCell className="flex gap-2">
                            <Button size="icon" variant="outline" className="cursor-pointer">
                                <Pencil />
                            </Button>
                            <Button size="icon" variant="destructive" className="cursor-pointer">
                                <Trash />
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
