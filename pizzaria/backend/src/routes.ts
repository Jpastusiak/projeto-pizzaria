import { Router } from "express";
import multer from "multer";
import uploadConfig from "./config/multer";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { CreateProductController } from "./controllers/product/CreateProductController";
import { ListProductController } from "./controllers/product/ListProductController";
import { DeleteProductController } from "./controllers/product/DeleteProductController";
import { ListProductByCategoryController } from "./controllers/product/ListProductByCategoryController";
import { ListOrdersController } from "./controllers/order/ListOrdersController";
import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { AddItemController } from "./controllers/order/AddItemController";
import { validateSchema } from "./middlewares/validateSchema";
import { createUserSchema, authUserSchema } from "./schemas/userSchema";
import { createCategorySchema } from "./schemas/categorySchema";
import { createProductSchema, listProductByCategorySchema, listProductSchema } from "./schemas/productSchema";
import { addItemSchema, createOrderSchema, removeItemSchema } from "./schemas/orderSchema";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { isAdmin } from "./middlewares/isAdmin";
import { RemoveItemController } from "./controllers/order/RemoveItemController";

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

//Rota para criar produto
router.post(
    "/product",
    isAuthenticated,
    isAdmin,
    upload.single("file"),
    validateSchema(createProductSchema),
    new CreateProductController().handle
);

//Rota para listar produtos
router.get(
    "/products",
    isAuthenticated,
    validateSchema(listProductSchema),
    new ListProductController().handle
);

//Rota para deletar/arquivar produto
router.delete(
    "/product",
    isAuthenticated,
    isAdmin,
    new DeleteProductController().handle
);

//Rota para listar produtos por categoria
router.get(
    "/category/product",
    isAuthenticated,
    validateSchema(listProductByCategorySchema),
    new ListProductByCategoryController().handle
);

//Rota para criar pedido
router.post(
    "/order",
    isAuthenticated,
    validateSchema(createOrderSchema),
    new CreateOrderController().handle
);

//Rota para listar pedidos
router.get(
    "/orders",
    isAuthenticated,
    new ListOrdersController().handle
);

//Adicionar item no pedido
router.post(
    "/order/add",
    isAuthenticated,
    validateSchema(addItemSchema),
    new AddItemController().handle
);

//Rota para remover item do pedido
router.delete(
    "/order/remove",
    isAuthenticated,
    validateSchema(removeItemSchema),
    new RemoveItemController().handle
);


export { router };