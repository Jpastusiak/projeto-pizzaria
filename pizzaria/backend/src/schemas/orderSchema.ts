import { z } from "zod";

//Esquema para criar um pedido
export const createOrderSchema = z.object({
    body: z.object({
        table: z
            .number({ message: "O número da mesa é obrigatório" })
            .int({ message: "O número da mesa deve ser um número inteiro" })
            .positive({ message: "O número da mesa deve ser um número positivo" }),
        name: z.string().optional(),
    }),
});

//Esquema para adicionar item no pedido
export const addItemSchema = z.object({
    body: z.object({
        order_id: z
            .string({ message: "O ID do pedido é obrigatório" })
            .min(1, { message: "O ID do pedido deve ser uma string não vazia" }),
        product_id: z
            .string({ message: "O ID do produto é obrigatório" })
            .min(1, { message: "O ID do produto deve ser uma string não vazia" }),
        amount: z
            .number({ message: "A quantidade é obrigatória" })
            .int({ message: "A quantidade deve ser um número inteiro" })
            .positive({ message: "A quantidade deve ser um número positivo" })
    })
});

//Esquema para remover item do pedido
export const removeItemSchema = z.object({
    query: z.object({
        item_id: z
            .string({ message: "O ID do item deve ser uma string" })
            .min(1, { message: "O ID do item é obrigatório" }),
    })
});