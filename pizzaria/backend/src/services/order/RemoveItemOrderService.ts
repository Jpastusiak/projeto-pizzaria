import prismaClient from "../../prisma/index";

//Interface para receber os dados do item a ser removido
interface RemoveItemProps {
    item_id: string;
}

//Service para remover item do pedido
class RemoveItemOrderService {
    async execute({ item_id }: RemoveItemProps) {
        try {
            //Verificar se o item existe
            const itemExists = await prismaClient.item.findFirst({
                where: {
                    id: item_id
                }
            });
            
            if (!itemExists) {
                throw new Error("Item não encontrado");
            }

            //Remover o item do pedido
            await prismaClient.item.delete({
                where: {
                    id: item_id
                }
            });

            return { message: "Item removido do pedido com sucesso" };
        } catch (err) {
            console.log(err);
            throw new Error("Erro ao remover item do pedido");
        }
    }
}

export { RemoveItemOrderService };