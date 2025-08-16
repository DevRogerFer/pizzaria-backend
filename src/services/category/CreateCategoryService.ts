import prismaClient from "../../prisma";
// criando a interface do serviço
interface CategoryRequest {
    name: string;
}

class CreateCategoryService {
    async execute({ name }: CategoryRequest) {
        // Verificando se o nome está vazio
        if (name === '') {
            throw new Error("Name is required!");
        }
        // se não estiver vazio, cria a categoria
        const category = await prismaClient.category.create({
            data: {
                name: name
            },
            select: {
                id: true,
                name: true
            }
        })

        return category;
    }
}

export { CreateCategoryService }