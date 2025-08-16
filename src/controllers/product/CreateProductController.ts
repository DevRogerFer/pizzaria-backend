import { Request, Response } from 'express';
import { CreateProductService } from '../../services/product/CreateProductService';

class CreateProductController {
    async handle(req: Request, res: Response) {
        const { name, price, description, category_id } = req.body;

        const createProductService = new CreateProductService();

        // verificando se o usuário enviou um arquivo de foto
        if(!req.file) {
            throw new Error("Error uploading file!");
        } else {
            const { originalname, filename: banner } = req.file;

            const produtc = await createProductService.execute({
            name,
            price,
            description,
            banner,
            category_id
        });

        res.json(produtc);
        }
    }
}

export { CreateProductController };