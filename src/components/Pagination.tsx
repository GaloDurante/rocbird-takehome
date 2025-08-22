'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    totalPages: number;
    currentPage: number;
}

export default function Pagination({ totalPages, currentPage }: PaginationProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const goToPage = (page: number) => {
        if (page === currentPage) return;
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', String(page));
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    if (totalPages <= 1) return null;

    return (
        <div className="p-4 flex justify-center items-center gap-2 border-t border-accent">
            <Button
                size="sm"
                variant="secondary"
                disabled={currentPage === 1}
                onClick={() => goToPage(currentPage - 1)}
                className="cursor-pointer disabled:cursor-default"
                aria-label="Página anterior"
            >
                <ChevronLeft />
            </Button>

            <Button
                size="sm"
                variant="secondary"
                disabled={currentPage === totalPages}
                onClick={() => goToPage(currentPage + 1)}
                className="cursor-pointer disabled:cursor-default"
                aria-label="Página siguiente"
            >
                <ChevronRight />
            </Button>
        </div>
    );
}
