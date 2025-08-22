'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { createTalentSchema, CreateTalentInput } from '@/lib/validations/talent';
import { TalentType } from '@/types/talent';

import { createTalentAction, updateTalentByIdAction } from '@/lib/actions/talent';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';

interface TalentFormProps {
    technicalReferences: { id: number; nombreYApellido: string }[];
    isEdit?: boolean;
    selectedTalent?: TalentType;
}

export default function TalentForm({ technicalReferences, isEdit = false, selectedTalent }: TalentFormProps) {
    const form = useForm<CreateTalentInput>({
        resolver: zodResolver(createTalentSchema),
        defaultValues:
            isEdit && selectedTalent
                ? {
                      nombreYApellido: selectedTalent.nombreYApellido,
                      rol: selectedTalent.rol,
                      seniority: selectedTalent.seniority,
                      estado: selectedTalent.estado,
                      liderId: selectedTalent.liderId ?? undefined,
                      mentorId: selectedTalent.mentorId ?? undefined,
                  }
                : {
                      nombreYApellido: '',
                      rol: '',
                      seniority: '',
                      estado: 'ACTIVO',
                  },
    });
    const router = useRouter();

    const onSubmit = async (data: CreateTalentInput) => {
        const action =
            isEdit && selectedTalent
                ? () => updateTalentByIdAction(selectedTalent.id, data)
                : () => createTalentAction(data);

        try {
            const result = await action();
            toast.success(result.message);
            router.push('/talentos');
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else if (typeof error === 'object' && error !== null) {
                const e = error as { type: string; message: string; errors?: string[] };
                if (e.type === 'validation') {
                    toast.error(e.message);
                    e.errors?.forEach((err) => toast.error(err));
                } else {
                    toast.error(e.message);
                }
            }
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                id="talent-form"
                className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4"
            >
                <FormField
                    control={form.control}
                    name="nombreYApellido"
                    render={({ field }) => (
                        <FormItem className="flex flex-col py-2">
                            <FormLabel>Nombre completo</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="estado"
                    render={({ field }) => (
                        <FormItem className="flex flex-col py-2">
                            <FormLabel>Estado</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={'ACTIVO'}>
                                <FormControl className="w-full">
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="ACTIVO">Activo</SelectItem>
                                    <SelectItem value="INACTIVO">Inactivo</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="rol"
                    render={({ field }) => (
                        <FormItem className="flex flex-col py-2">
                            <FormLabel>Rol</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="seniority"
                    render={({ field }) => (
                        <FormItem className="flex flex-col py-2">
                            <FormLabel>Seniority</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="mentorId"
                    render={({ field }) => (
                        <FormItem className="flex flex-col py-2">
                            <FormLabel>Mentor</FormLabel>
                            <Select
                                onValueChange={(val) => field.onChange(val ? Number(val) : undefined)}
                                value={field.value ? String(field.value) : ''}
                            >
                                <FormControl className="w-full">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccione un mentor" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {technicalReferences.map((th) => (
                                        <SelectItem key={th.id} value={String(th.id)}>
                                            {th.nombreYApellido}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="liderId"
                    render={({ field }) => (
                        <FormItem className="flex flex-col py-2">
                            <FormLabel>Lider</FormLabel>
                            <Select
                                onValueChange={(val) => field.onChange(val ? Number(val) : undefined)}
                                value={field.value ? String(field.value) : ''}
                            >
                                <FormControl className="w-full">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccione un lider" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {technicalReferences.map((th) => (
                                        <SelectItem key={th.id} value={String(th.id)}>
                                            {th.nombreYApellido}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
            <div className="flex justify-between mt-4">
                <Button type="button" variant="outline" className="cursor-pointer" onClick={() => form.reset()}>
                    Reiniciar
                </Button>
                <Button
                    type="submit"
                    form="talent-form"
                    className="cursor-pointer"
                    disabled={form.formState.isSubmitting || !form.formState.isDirty}
                >
                    {form.formState.isSubmitting ? (
                        <LoaderCircle className="animate-spin" />
                    ) : isEdit ? (
                        'Guardar Cambios'
                    ) : (
                        'Crear Talento'
                    )}
                </Button>
            </div>
        </Form>
    );
}
