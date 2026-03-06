import { z } from 'zod';

export const createUserSchema = z.object({
    body: z.object({
        name: z
            .string({ message: 'O nome precisa ser um texto' })
            .min(3, { message: 'O nome deve conter pelo menos 3 caracteres' }),
        email: z
            .email({ message: 'Endereço de email inválido' }),
        password: z
            .string({ message: 'Senha obrigaória' })
            .min(6, { message: 'A senha deve conter pelo menos 6 caracteres'} )
    }),
});

export const authUserSchema = z.object({
    body: z.object({
        email: z.email({ message: 'Endereço de email inválido' }),
        password: z.string({ message: 'Senha obrigaória' })
    }),
});