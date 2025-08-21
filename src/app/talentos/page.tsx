import { EstadoTalento } from '@/generated/prisma';
import { getAllTalents } from '@/lib/services/talent';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import TalentsTable from '@/components/TalentsTable';
import Filters from '@/components/Filters';

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
    const { page, limit, sort = 'asc', name, seniority, role, status } = await searchParams;
    const talents = await getAllTalents({
        page: page ? Math.max(1, Number(page)) : undefined,
        limit: limit ? Math.max(1, Number(limit)) : undefined,
        sort,
        name,
        seniority,
        role,
        status,
    });

    return (
        <div className="p-4 md:p-8">
            <div className="flex flex-col gap-2 justify-between items-center lg:flex-row">
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4 w-full lg:max-w-8/12">
                    <Filters />
                </div>
                <Button asChild variant={'outline'} className="self-end">
                    <Link href="/talentos/new">Crear Talento</Link>
                </Button>
            </div>
            <div className="mt-4">
                <TalentsTable talents={talents} />
            </div>
        </div>
    );
}
