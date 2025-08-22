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
