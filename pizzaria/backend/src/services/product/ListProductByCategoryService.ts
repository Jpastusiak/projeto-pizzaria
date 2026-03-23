import prismaClient from "../../prisma/index";

interface ListProductByCategoryServiceProps {
    category_id: string;
}

class ListProductByCategoryService {
    async execute({ category_id }: ListProductByCategoryServiceProps) {
        try {
            // Verificar se a categoria existe
            const category = await prismaClient.category.findUnique({
                where: { 
                    id: category_id 
                },
            });

            if (!category) {
                throw new Error("Categoria não encontrada");
            }

            // Listar produtos da categoria (apenas produtos ativos)
            const products = await prismaClient.product.findMany({
                where: { 
                    category_id: category_id,
                    disabled: false, // Apenas produtos ativos
                },
                select: {
                    id: true,
                    name: true,
                    price: true,
                    description: true,
                    banner: true,
                    disabled: true,
                    category_id: true,
                    createdAt: true,
                    category: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
                orderBy: {
                    createdAt: "desc",
                },
            });

            return products;
        } catch (err) {
            if (err instanceof Error) {
                throw new Error(err.message);
            }
            throw new Error("Erro ao listar produtos por categoria");
        }
    }
}

export { ListProductByCategoryService };