import prismaClient from "../../prisma/index";
import { hash } from "bcryptjs";

interface CreateUserProps{
    name: string;
    email: string;
    password: string;
}


class CreateUserService {
    async execute({ name, email, password }: CreateUserProps) {
        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })

        if(userAlreadyExists){
            throw new Error("Usuário já existe!");
        }

        // Criptografando a senha do usuário
        const passwordHash = await hash(password, 8);


        // Lógica para criar um usuário
        const user = await prismaClient.user.create({
            data: {
                name: name,
                email: email,
                password: passwordHash //senha criptografada
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true
            }
        });

        return user;
    }
}

export { CreateUserService };