import { Prisma, Order } from "@prisma/client";
import { prisma } from "../utils/prisma.js";

export class OrderRepository {
  private static instance: OrderRepository;

  static getInstance(): OrderRepository {
    if (!this.instance) {
      this.instance = new OrderRepository();
    }
    return this.instance;
  }

  async findByUserId(userId: string): Promise<Order[]> {
    return await prisma.order.findMany({ 
      where: { userId },
      include: {
        items: {
          include: {
            product: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
     });
  }

  async createOrder(orderData: Prisma.OrderCreateInput): Promise<Order | null> {
    const order = await prisma.order.create({ data: orderData });
    console.log("Pedido criado com sucesso: ", order);
    return order;
  }
}
