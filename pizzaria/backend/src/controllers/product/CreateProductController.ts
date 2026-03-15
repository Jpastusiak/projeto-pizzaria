import { Request, Response } from "express";
import { CreateProductService } from "../../services/product/CreateProductService";

class CreateProductController {
    async handle(req: Request, res: Response) {
        const { name, description, price, category_id } = req.body;

        if (!req.file) {
            throw new Error("Imagem do produto é obrigatória.");
        }

        const createProduct = new CreateProductService();

        const product = await createProduct.execute({
            name: name,
            description: description,
            price: parseInt(price), //converte o texto do form-data para número
            category_id: category_id,
            imageBuffer: req.file.buffer,
            imageName: req.file.originalname
        });

        return res.json(product);
    }
}

export { CreateProductController };