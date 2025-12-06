import { Request, Response } from 'express';
import { CreateProductService } from '../../services/product/CreateProductService';
import { UploadedFile } from 'express-fileupload'
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

// Configuração do Cloudinary usando variáveis de ambiente
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})

class CreateProductController {
    async handle(req: Request, res: Response) {
        const { name, price, description, category_id } = req.body;

        const createProductService = new CreateProductService();

        // verificando se o usuário enviou um arquivo de imagem
        if(!req.files || Object.keys(req.files).length === 0) {
            throw new Error("Error uploading file!");
        } else {
            const file = req.files['file'] as UploadedFile
            // fazendo o upload da imagem para o cloudinary            
            const resultFile: UploadApiResponse = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream({}, function(error, result) {
                    
                    if (error) {
                        reject(error);
                        return;
                    }
                    
                    resolve(result)
                }).end(file.data)
            })
            
            const menu = await createProductService.execute({
                name,
                price,
                description,
                banner: resultFile.url,
                category_id
            })

            res.json(menu)

        }
    }
}

export { CreateProductController };