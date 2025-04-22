import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export const registerDoctorSchema = z.object({
	name: z.string().nonempty(),
	cpf: z.string().nonempty(),
	crm: z.string().nonempty(),
	specialtyId: z.string().nonempty(),
});

export const resolver = zodResolver(registerDoctorSchema);

export type FormData = z.infer<typeof registerDoctorSchema>;

export const defaultValues: FormData = {
	name: '',
	cpf: '',
	crm: '',
	specialtyId: '',
};
