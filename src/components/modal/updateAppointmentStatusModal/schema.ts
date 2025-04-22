import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export const updateAppointmentStatusSchema = z.object({
	status: z.string().nonempty(),
});

export const resolver = zodResolver(updateAppointmentStatusSchema);

export type FormData = z.infer<typeof updateAppointmentStatusSchema>;

export const defaultValues: FormData = {
	status: '',
};
