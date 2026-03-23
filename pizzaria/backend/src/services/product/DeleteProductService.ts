import prismaClient from "../../prisma/index";

interface DeleteProductServiceProps {
    product_id: string;
}

class DeleteProductService {
    async execute({ product_id }: DeleteProductServiceProps) {
        try {
            await prismaClient.product.update({
                where: {
                    id: product_id
                },
                data: {
                    disabled: true
                }
            });

            return { message: "Produto deletado/arquivado com sucesso!" };

        } catch (err) {
            throw new Error("Erro ao deletar produto");
        }
    }
}

export { DeleteProductService };