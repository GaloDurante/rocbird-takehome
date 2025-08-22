import { EstadoTalento } from '@/generated/prisma';
import { getAllTalents } from '@/lib/services/talent';

import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import TalentsTable from '@/components/TalentsTable';
import Filters from '@/components/Filters';
import Pagination from '@/components/Pagination';

interface TalentsPageParams {
    searchParams: Promise<{
        page?: string;
        limit?: string;
        sort?: 'asc' | 'desc';
        name?: string;
        seniority?: string;
        role?: string;
        status?: EstadoTalento;
    }>;
}

export default async function TalentsPage({ searchParams }: TalentsPageParams) {
    const { page = '1', limit = '15', sort = 'asc', name, seniority, role, status } = await searchParams;
    const pageNumber = Math.max(1, Number(page));
    const limitNumber = Math.max(1, Number(limit));

    const { talents, total } = await getAllTalents({
        page: pageNumber,
        limit: limitNumber,
        sort,
        name,
        seniority,
        role,
        status,
    });

    const totalPages = Math.ceil(total / limitNumber);

    return (
        <div className="p-4 md:p-8 min-h-screen flex flex-col">
            <div className="flex flex-col gap-2 justify-between items-center lg:flex-row">
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4 w-full lg:max-w-8/12">
                    <Filters />
                </div>
                <Button asChild variant={'outline'} className="self-end">
                    <Link href="/talentos/new">Crear Talento</Link>
                </Button>
            </div>
            <div className="mt-4 border border-accent rounded-lg flex flex-col flex-1">
                {talents.length === 0 ? (
                    <div className="flex flex-col flex-1 items-center justify-center">
                        <Search size={32} />
                        <p className="text-lg font-medium mt-4">No se encontraron talentos.</p>
                        <p className="text-sm mt-1 text-muted-foreground">
                            Intenta ajustar los filtros o criterios de búsqueda.
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="flex-1">
                            <TalentsTable talents={talents} />
                        </div>
                        <Pagination totalPages={totalPages} currentPage={pageNumber} />
                    </>
                )}
            </div>
        </div>
    );
}
