import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export const registerSpecialtySchema = z.object({
	name: z.string().nonempty(),
});

export const resolver = zodResolver(registerSpecialtySchema);

export type FormData = z.infer<typeof registerSpecialtySchema>;

export const defaultValues: FormData = {
	name: '',
};
