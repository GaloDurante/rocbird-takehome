import { z } from 'zod';
import { EstadoTalento } from '@/generated/prisma';

export const createTalentSchema = z.object({
    nombreYApellido: z.string('Nombre y apellido inválido').nonempty('El nombre y apellido es requerido'),
    seniority: z.string('Seniority inválido').nonempty('Seniority es requerido'),
    rol: z.string('Rol inválido').nonempty('Rol es requerido'),
    estado: z.enum(EstadoTalento, 'Estado inválido. Por favor selecciona ACTIVO o INACTIVO').optional(),
});

export const updateTalentSchema = createTalentSchema.partial();
