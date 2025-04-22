import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export const registerAppointmentSchema = z.object({
	appointmentDateTime: z.string().nonempty(),
	observation: z.string(),
	doctorName: z.string().nonempty(),
	specialtyId: z.string().nonempty(),
	patient: z.object({
		name: z.string().nonempty(),
		cpf: z.string().nonempty(),
		email: z.string().nonempty(),
		phone: z.string().nonempty(),
	}),
});

export const resolver = zodResolver(registerAppointmentSchema);

export type FormData = z.infer<typeof registerAppointmentSchema>;

export const defaultValues: FormData = {
	appointmentDateTime: '',
	observation: '',
	doctorName: '',
	specialtyId: '',
	patient: {
		name: '',
		cpf: '',
		email: '',
		phone: '',
	},
};
