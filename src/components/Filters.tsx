'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectLabel,
    SelectGroup,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';

export default function Filters() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [name, setName] = useState(searchParams.get('name') ?? '');

    const handleChange = useCallback(
        (key: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());

            if (value === 'all' || value === '') {
                params.delete(key);
            } else {
                params.set(key, value);
            }

            router.push(`${pathname}?${params.toString()}`, { scroll: false });
        },
        [router, pathname, searchParams],
    );

    useEffect(() => {
        const handler = setTimeout(() => {
            handleChange('name', name);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [name, handleChange]);

    return (
        <>
            <Input
                placeholder="Buscar por nombre"
                defaultValue={searchParams.get('name') ?? undefined}
                onChange={(e) => setName(e.target.value)}
            />
            <Select
                value={searchParams.get('seniority') ?? undefined}
                onValueChange={(value) => handleChange('seniority', value)}
            >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seniority" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Seniority</SelectLabel>
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="Junior">Junior</SelectItem>
                        <SelectItem value="SemiSenior">Semi-Senior</SelectItem>
                        <SelectItem value="Senior">Senior</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            <Select
                value={searchParams.get('role') ?? undefined}
                onValueChange={(value) => handleChange('role', value)}
            >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Rol" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Rol</SelectLabel>
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="Frontend">Developer</SelectItem>
                        <SelectItem value="Backend">Designer</SelectItem>
                        <SelectItem value="Fullstack">QA</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            <Select
                value={searchParams.get('status') ?? undefined}
                onValueChange={(value) => handleChange('status', value)}
            >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Estado</SelectLabel>
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="ACTIVO">Activo</SelectItem>
                        <SelectItem value="INACTIVO">Inactivo</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </>
    );
}
