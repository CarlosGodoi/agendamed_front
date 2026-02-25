import {z} from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export const registeradministratorSchema = z.object({
  name: z.string().nonempty(),
  email: z.string().email().nonempty(),
  cpf: z.string().nonempty(),
  role: z.string(),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
})

export const resolver = zodResolver(registeradministratorSchema);

export type FormData = z.infer<typeof registeradministratorSchema>;

export const defaultValues: FormData = {
  name: '',
  email: '',
  cpf: '',
  role: '',
  password: ''
}