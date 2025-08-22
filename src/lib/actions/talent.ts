import { CreateTalentInput } from '@/types/talent';

export const deleteTalentByIdAction = async (id: number) => {
    const res = await fetch(`/api/talentos/${id}`, {
        method: 'DELETE',
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || 'Error al eliminar talento');
    }

    return data;
};

export const createTalentAction = async (formData: CreateTalentInput) => {
    const res = await fetch(`/api/talentos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
        if (res.status === 400) {
            throw {
                type: 'validation',
                message: data.message || 'Datos inválidos',
                errors: data.errors || [],
            };
        } else {
            throw new Error(data.message || 'Error al crear un talento');
        }
    }

    return data;
};

export const updateTalentByIdAction = async (id: number, formData: CreateTalentInput) => {
    const res = await fetch(`/api/talentos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
        if (res.status === 400) {
            throw {
                type: 'validation',
                message: data.message || 'Datos inválidos',
                errors: data.errors || [],
            };
        } else {
            throw new Error(data.message || 'Error al editar un talento');
        }
    }

    return data;
};
