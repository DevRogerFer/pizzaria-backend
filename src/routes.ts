// importando as bibliotecas do express
import {Router} from 'express'
// importano o multer para upload de arquivos
import multer from 'multer';
// importando os Controllers de Usuário
import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';
// importando os Controllers de Categoria
import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { ListCategoryController } from './controllers/category/ListCategoryController';
// importando os Controllers de Produto
import { CreateProductController } from './controllers/product/CreateProductController';
import { ListByCategoryController } from './controllers/product/ListByCategoryController';
// importando os Controllers de Ordem de Pedido
import { CreateOrderController } from './controllers/order/CreateOrderController';
import { RemoveOrderController } from './controllers/order/RemoveOrderController';
import { AddItemController } from './controllers/order/AddItemController';
import { RemoveItemController } from './controllers/order/RemoveItemController';
import { SendOrderController } from './controllers/order/SendOrderController';
import { ListOrdersController } from './controllers/order/ListOrdersController';
import { DetailOrderController } from './controllers/order/DetailOrderController';
import { FinishOrderController } from './controllers/order/FinishOrderController';

// importando o middleware de autenticação
import { isAuthenticated } from './middlewares/isAuthenticated';
// Importando configuração do multer (para upload de arquivos de fotos)
import uploadConfig from './config/multer';

// criando o router
const router = Router();
// criando o multer com a configuração de upload
const upload = multer(uploadConfig.upload("./tmp"));

// -- ROTAS USERS --
router.post('/users', new CreateUserController().handle) // USER
router.post('/session', new AuthUserController().handle)    // LOGIN
router.get('/user_detail', isAuthenticated, new DetailUserController().handle) // DETAIL USER

// -- ROTAS CATEGORY --
router.post('/category', isAuthenticated, new CreateCategoryController().handle) // CREATE CATEGORY
router.get('/category', isAuthenticated, new ListCategoryController().handle) // LIST CATEGORIES

// -- ROTAS PRODUCTS --
// upload.single('file') permite o upload de um único arquivo com o campo 'file'
//router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle) // CREATE PRODUCT
router.post('/product', isAuthenticated, new CreateProductController().handle) // CREATE PRODUCT
router.get('/category/product', isAuthenticated, new ListByCategoryController().handle) // LIST PRODUCTS BY CATEGORY

// -- ROTAS ORDERS --
router.post('/order', isAuthenticated, new CreateOrderController().handle) // CREATE ORDER
router.delete('/order', isAuthenticated, new RemoveOrderController().handle) // REMOVE ORDER
router.post('/order/add', isAuthenticated, new AddItemController().handle) // ADD ITEM TO ORDER
router.delete('/order/remove', isAuthenticated, new RemoveItemController().handle) // REMOVE ITEM FROM ORDER
router.put('/order/send', isAuthenticated, new SendOrderController().handle) // UPDATE ORDER (exemplo de rota PUT)
router.get('/orders', isAuthenticated, new ListOrdersController().handle) // LIST ORDERS
router.get('/order/detail', isAuthenticated, new DetailOrderController().handle) // DETAIL ORDER
router.put('/order/finish', isAuthenticated, new FinishOrderController().handle) // FINISH ORDER

// exportando o router
export {router};