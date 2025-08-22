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
    const [seniority, setSeniority] = useState(searchParams.get('seniority') ?? '');
    const [role, setRole] = useState(searchParams.get('role') ?? '');
    const [status, setStatus] = useState(searchParams.get('status') ?? '');

    const handleChange = useCallback(
        (key: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());

            if (!value) {
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
                value={seniority}
                onValueChange={(value) => {
                    const val = value === 'all' ? '' : value;
                    setSeniority(val);
                    handleChange('seniority', val);
                }}
            >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seniority" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Seniority</SelectLabel>
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="Junior">Junior</SelectItem>
                        <SelectItem value="Semi Senior">Semi Senior</SelectItem>
                        <SelectItem value="Senior">Senior</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            <Select
                value={role}
                onValueChange={(value) => {
                    const val = value === 'all' ? '' : value;
                    setRole(val);
                    handleChange('role', val);
                }}
            >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Rol" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Rol</SelectLabel>
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="Developer">Developer</SelectItem>
                        <SelectItem value="Designer">Designer</SelectItem>
                        <SelectItem value="QA">QA</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            <Select
                value={status}
                onValueChange={(value) => {
                    const val = value === 'all' ? '' : value;
                    setStatus(val);
                    handleChange('status', val);
                }}
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
