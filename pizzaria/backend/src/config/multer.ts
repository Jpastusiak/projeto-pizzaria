import multer from "multer";

//Usar o memoryStorage para manter o arquivo em memória e enviar diretamente para o cloudinary
export default {
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // Limite de 5MB
    },
    fileFilter: (req: any, file: Express.Multer.File, cb: any) => {
        const allowedMimes = ["image/jpeg","image/png","image/jpg"];

        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Formato de arquivo inválido. Apenas JPEG, PNG e JPG são permitidos."));
        }
    }
};