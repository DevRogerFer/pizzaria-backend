import prismaClient from "../../prisma";

interface OrderRequest {
    order_id: string;
}

class SendOrderService {
    async execute({ order_id }: OrderRequest) {
        // buscando o item do pedido a ser enviado
        const order = await prismaClient.order.update({
            where: {
                id: order_id
            },
            data: {
                draft: false // Atualizando o rascunho do pedido para 'falso'
            }
        });
        // retornando o pedido atualizado
        return order;
    }
}

export { SendOrderService };