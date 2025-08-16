import prismaClient from "../../prisma";

// interface para tipos de produtos
interface ProductRequest {
    category_id: string;
}

class ListByCategoryService {
    async execute({ category_id }: ProductRequest) {

        // buscando os produtos por categoria
        const findByCategory = await prismaClient.product.findMany({
            where: {
                category_id: category_id
            }
        })

        return findByCategory;

    }

}

export { ListByCategoryService }