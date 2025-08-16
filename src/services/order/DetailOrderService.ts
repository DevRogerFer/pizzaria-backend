import prismaClient from "../../prisma";

interface DetailRequest {
    order_id: string;
}

class DetailOrderService {
  async execute({order_id}: DetailRequest) {
    
    const orders = await prismaClient.item.findMany({
        where: {
            order_id: order_id,
        },
        include: {
            product: true, // Inclui os detalhes do produto associado ao item
            order: true, // Inclui os detalhes do pedido associado ao item
        },
    })

    return orders;
  }

}

export { DetailOrderService };