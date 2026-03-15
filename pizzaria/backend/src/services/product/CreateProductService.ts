import prismaClient from "../../prisma/index";
import cloudinary from "../../config/cloudinary";
import { Readable } from "node:stream";

interface CreateProductServiceProps{
    name: string;
    description: string;
    price: number;
    category_id: string;
    imageBuffer: Buffer;
    imageName: string;
}

class CreateProductService {
    async execute({ 
        name, 
        description, 
        price, 
        category_id, 
        imageBuffer, 
        imageName 
    }: CreateProductServiceProps) {

        const categoryExists = await prismaClient.category.findFirst({
            where: {
                id: category_id
            }
        });

        if (!categoryExists) {
            throw new Error("Categoria não encontrada.");
        }

        //Enviar pro Cloudinary e pegar a URL da imagem
        let bannerUrl = "";

        try {
            const result = await new Promise<any>((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream({
                    folder: "products",
                    resource_type: "image",
                    public_id: `${Date.now()}-${imageName.split(".")[0]}`
                }, (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                })

                //Criar o stream do buffer e faezr o pipe para o Cloudinary
                const bufferStream = Readable.from(imageBuffer);
                bufferStream.pipe(uploadStream);
            });

            bannerUrl = result.secure_url;


        }catch (error) {
            console.log(error);
            throw new Error("Erro ao enviar imagem.");
        }

        //Salvar a url da imagem no banco de dados junto com os outros dados do produto
        const product = await prismaClient.product.create({
            data: {
                name: name,
                description: description,
                price: price,
                category_id: category_id,
                banner: bannerUrl
            },
            select: {
                id: true,
                name: true,
                description: true,
                price: true,
                banner: true,
                category_id: true,
                createdAt: true
            }
        });


        return product;
    }
}

export { CreateProductService };