import { Request, Response } from 'express';
import { CreateUserService } from '../../services/user/CreateUserService';

// Controlador para criar um usuário
class CreateUserController {
    async handle(req: Request, res: Response) {
        const { name, email, password } = req.body;

        //passando as propriedades do body para o serviço
        const createUserService = new CreateUserService();
        const user = await createUserService.execute({ 
            name: name, 
            email: email, 
            password: password 
        });

        res.json(user);
    }
}

export { CreateUserController };