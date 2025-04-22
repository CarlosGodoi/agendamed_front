import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, { message: "Senha obrigatória" })
})

export const resolver = zodResolver(loginSchema)

export type FormData = z.infer<typeof loginSchema>

export const defaultValues: FormData = {
    email: "",
    password: ""
}