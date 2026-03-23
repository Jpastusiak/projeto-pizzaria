import prismaClient from "../../prisma";

interface ListOrdersServiceProps{
    draft?: string;
}

class ListOrdersService {
    async execute({draft}: ListOrdersServiceProps){ 

        //Litar todos os pedidos, mesmo os que estão em rascunho
        const orders = await prismaClient.order.findMany({
            where: {
                draft: draft === "true" ? true : false
            },
            select: {
                id: true,
                table: true,
                name: true,
                draft: true,
                status: true,
                createdAt: true,
                items: {
                    select: {
                        id: true,
                        amount: true,
                        product: {
                            select: {
                                id: true,
                                name: true,
                                description: true,
                                price: true,
                                banner: true
                            }
                        }
                    }
                }
            }
        });

        return orders;
    }
}

export { ListOrdersService }