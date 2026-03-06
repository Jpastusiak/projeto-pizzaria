import { Router } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { validateSchema } from "./middlewares/validateSchema";
import { createUserSchema, authUserSchema } from "./schemas/userSchema";
import { createCategorySchema } from "./schemas/categorySchema";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { isAdmin } from "./middlewares/isAdmin";

const router = Router();

// Rota para criar um usuário
router.post(
    "/users", 
    validateSchema(createUserSchema), 
    new CreateUserController().handle
);

// Rota para login (autenticação)
router.post(
    "/session", 
    validateSchema(authUserSchema), 
    new AuthUserController().handle
);

router.get(
    "/me",
    isAuthenticated,
    new DetailUserController().handle
)

//Rota de criar categoria
router.post(
    "/category",
    isAuthenticated,
    isAdmin,
    validateSchema(createCategorySchema),
    new CreateCategoryController().handle
);

export { router };