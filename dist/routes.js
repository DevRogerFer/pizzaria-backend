"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
// importando as bibliotecas do express
const express_1 = require("express");
// importano o multer para upload de arquivos
const multer_1 = __importDefault(require("multer"));
// importando os Controllers de Usuário
const CreateUserController_1 = require("./controllers/user/CreateUserController");
const AuthUserController_1 = require("./controllers/user/AuthUserController");
const DetailUserController_1 = require("./controllers/user/DetailUserController");
// importando os Controllers de Categoria
const CreateCategoryController_1 = require("./controllers/category/CreateCategoryController");
const ListCategoryController_1 = require("./controllers/category/ListCategoryController");
// importando os Controllers de Produto
const CreateProductController_1 = require("./controllers/product/CreateProductController");
const ListByCategoryController_1 = require("./controllers/product/ListByCategoryController");
// importando os Controllers de Ordem de Pedido
const CreateOrderController_1 = require("./controllers/order/CreateOrderController");
const RemoveOrderController_1 = require("./controllers/order/RemoveOrderController");
const AddItemController_1 = require("./controllers/order/AddItemController");
const RemoveItemController_1 = require("./controllers/order/RemoveItemController");
const SendOrderController_1 = require("./controllers/order/SendOrderController");
const ListOrdersController_1 = require("./controllers/order/ListOrdersController");
const DetailOrderController_1 = require("./controllers/order/DetailOrderController");
const FinishOrderController_1 = require("./controllers/order/FinishOrderController");
// importando o middleware de autenticação
const isAuthenticated_1 = require("./middlewares/isAuthenticated");
// Importando configuração do multer (para upload de arquivos de fotos)
const multer_2 = __importDefault(require("./config/multer"));
// criando o router
const router = (0, express_1.Router)();
exports.router = router;
// criando o multer com a configuração de upload
const upload = (0, multer_1.default)(multer_2.default.upload("./tmp"));
// -- ROTAS USERS --
router.post('/users', new CreateUserController_1.CreateUserController().handle); // USER
router.post('/session', new AuthUserController_1.AuthUserController().handle); // LOGIN
router.get('/user_detail', isAuthenticated_1.isAuthenticated, new DetailUserController_1.DetailUserController().handle); // DETAIL USER
// -- ROTAS CATEGORY --
router.post('/category', isAuthenticated_1.isAuthenticated, new CreateCategoryController_1.CreateCategoryController().handle); // CREATE CATEGORY
router.get('/category', isAuthenticated_1.isAuthenticated, new ListCategoryController_1.ListCategoryController().handle); // LIST CATEGORIES
// -- ROTAS PRODUCTS --
// upload.single('file') permite o upload de um único arquivo com o campo 'file'
//router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle) // CREATE PRODUCT
router.post('/product', isAuthenticated_1.isAuthenticated, new CreateProductController_1.CreateProductController().handle); // CREATE PRODUCT
router.get('/category/product', isAuthenticated_1.isAuthenticated, new ListByCategoryController_1.ListByCategoryController().handle); // LIST PRODUCTS BY CATEGORY
// -- ROTAS ORDERS --
router.post('/order', isAuthenticated_1.isAuthenticated, new CreateOrderController_1.CreateOrderController().handle); // CREATE ORDER
router.delete('/order', isAuthenticated_1.isAuthenticated, new RemoveOrderController_1.RemoveOrderController().handle); // REMOVE ORDER
router.post('/order/add', isAuthenticated_1.isAuthenticated, new AddItemController_1.AddItemController().handle); // ADD ITEM TO ORDER
router.delete('/order/remove', isAuthenticated_1.isAuthenticated, new RemoveItemController_1.RemoveItemController().handle); // REMOVE ITEM FROM ORDER
router.put('/order/send', isAuthenticated_1.isAuthenticated, new SendOrderController_1.SendOrderController().handle); // UPDATE ORDER (exemplo de rota PUT)
router.get('/orders', isAuthenticated_1.isAuthenticated, new ListOrdersController_1.ListOrdersController().handle); // LIST ORDERS
router.get('/order/detail', isAuthenticated_1.isAuthenticated, new DetailOrderController_1.DetailOrderController().handle); // DETAIL ORDER
router.put('/order/finish', isAuthenticated_1.isAuthenticated, new FinishOrderController_1.FinishOrderController().handle); // FINISH ORDER
