import { Router } from "express";
import multer from "multer";
import uploadConfig from "./config/multer";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { CreateProductController } from "./controllers/product/CreateProductController";
import { validateSchema } from "./middlewares/validateSchema";
import { createUserSchema, authUserSchema } from "./schemas/userSchema";
import { createCategorySchema } from "./schemas/categorySchema";
import { createProductSchema } from "./schemas/productSchema";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { isAdmin } from "./middlewares/isAdmin";

const router = Router();
const upload = multer(uploadConfig);

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

//Rota para criar categoria
router.post(
    "/category",
    isAuthenticated,
    isAdmin,
    validateSchema(createCategorySchema),
    new CreateCategoryController().handle
);

//Rota para listar categorias
router.get(
    "/category",
    isAuthenticated,
    new ListCategoryController().handle
);

// Rota para criar produto
router.post(
    "/product",
    isAuthenticated,
    isAdmin,
    upload.single("file"),
    validateSchema(createProductSchema),
    new CreateProductController().handle
);

export { router };