import prismaClient from "../../prisma";

// criando a classe ListCategoryService
class ListCategoryService {
    async execute() {
        // buscando todas as categorias no banco de dados
        const category = await prismaClient.category.findMany({
            select: {
                id: true,
                name: true,
            }
        });

        // retornando as categorias encontradas
        return category;
    }
}

export { ListCategoryService };