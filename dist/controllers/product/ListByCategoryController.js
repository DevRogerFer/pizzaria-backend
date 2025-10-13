"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListByCategoryController = void 0;
const ListByCategoryService_1 = require("../../services/product/ListByCategoryService");
class ListByCategoryController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const category_id = req.query.category_id;
            // instanciando o serviço
            const listByCategoryService = new ListByCategoryService_1.ListByCategoryService();
            // executando o serviço para listar produtos por categoria
            const products = yield listByCategoryService.execute({
                category_id
            });
            res.json(products);
        });
    }
}
exports.ListByCategoryController = ListByCategoryController;
