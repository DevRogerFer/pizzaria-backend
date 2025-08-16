import { Request, Response } from "express";
import { ListByCategoryService } from "../../services/product/ListByCategoryService";

class ListByCategoryController {
    async handle(req: Request, res: Response) {
        const category_id  = req.query.category_id as string;
        // instanciando o serviço
        const listByCategoryService = new ListByCategoryService();
        // executando o serviço para listar produtos por categoria
        const products = await listByCategoryService.execute({
            category_id
        });

        res.json(products);
    }
}

export { ListByCategoryController };