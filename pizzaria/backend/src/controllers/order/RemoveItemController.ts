import { Request, Response } from "express";
import { RemoveItemOrderService } from "../../services/order/RemoveItemOrderService";

// Controller para remover um item do pedido
class RemoveItemController {
    async handle(req: Request, res: Response) {
        // Pegando o item_id do query params
        const { item_id } = req.query;

        // Criando uma instância do serviço de remoção de item do pedido
        const removeItem = new RemoveItemOrderService();

        // Executando o serviço para remover o item do pedido
        const result = await removeItem.execute({ 
            item_id: item_id as string
        });

        res.status(200).json(result);
    }
}

export { RemoveItemController };