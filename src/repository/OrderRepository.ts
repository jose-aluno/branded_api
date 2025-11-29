import { Prisma, Order } from "../generated/prisma/index.js";
import { prisma } from "../utils/prisma.js";

export class OrderRepository{
  private static instance: OrderRepository;

  static getInstance(): OrderRepository {
    if (!this.instance) {
      this.instance = new OrderRepository();
    }
    return this.instance;
  }

  async findByUserId(userId: string): Promise<Order[]> {
    return await prisma.order.findMany({where: { userId }})
  }

  async findById(id: string): Promise<Order | null> {
    return await prisma.order.findUnique({where: {id}})
  }

  async createOrder(orderData: Prisma.OrderCreateInput): Promise<Order | null> {
    const order = await prisma.order.create({data: orderData});
    console.log("Pedido criado com sucesso: ", order);
    return order;
  }

  async updateOrder(id: string, orderData: Prisma.OrderUpdateInput): Promise<Order | null> {
    const updatedOrder = await prisma.order.update({where: {id}, data: orderData});
    console.log("Pedido atualizado com sucesso: ", updatedOrder);
    return updatedOrder;
  }

  async deleteById(id: string): Promise<Order | null> {
    const deletedOrder = await prisma.order.delete({where: {id}});
    console.log("Pedido removido com sucesso: ", deletedOrder);
    return deletedOrder;
  }
}