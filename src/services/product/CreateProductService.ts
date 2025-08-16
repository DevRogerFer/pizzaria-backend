// biblioteca de acesso ao banco de dados
import prismaClient from "../../prisma";

// criando a interface para o produto
interface ProductRequest {
    name: string;
    price: string;
    description: string;
    banner: string;
    category_id: string;
}

// criando a classe de serviço
class CreateProductService {
    async execute({name, price, description, banner, category_id}: ProductRequest){

        const product = await prismaClient.product.create({
            data: {
                name: name,
                price: price,
                description: description,
                banner: banner,
                category_id: category_id,
            }
        })

        return product;
    }
}

export { CreateProductService };