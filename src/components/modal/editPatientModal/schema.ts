import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const EditPatientSchema = z.object({
	name: z.string(),
	phone: z.string().min(1, 'Telefone é obrigatório').trim(),
	email: z.string().email('Email inválido').trim(),
	cpf: z.string(),
	created_at: z.string(),
	updated_at: z.string(),
});

export const resolver = zodResolver(EditPatientSchema);

export type FormData = z.infer<typeof EditPatientSchema>;

export const defaultValues: FormData = {
	name: '',
	phone: '',
	email: '',
	cpf: '',
	created_at: '',
	updated_at: '',
};
