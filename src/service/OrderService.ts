import { Prisma, Order } from "../generated/prisma/index.js";
import { OrderRepository } from "../repository/OrderRepository.js";

export class OrderService {
  private orderRepository = OrderRepository.getInstance();

  async findByUserId(userId: string): Promise<Order[] > {
    this.validarId(userId);
    const orders = await this.orderRepository.findByUserId(userId);

    if (orders.length === 0) throw new Error("Nenhum pedido encontrado");

    return orders;
  }

  async createOrder(orderData: Prisma.OrderCreateInput): Promise<Order | null> {
    return await this.orderRepository.createOrder(orderData);
  }

  async updateOrder(id: string | undefined, OrderData: Prisma.OrderUpdateInput): Promise<Order | null> {
    this.validarId(id);

    const exists = await this.orderRepository.findById(id!);
    if (!exists) {
      throw new Error("Pedido não encontrado");
    }

    return await this.orderRepository.updateOrder(id!, OrderData);
  }

  private validarId(id: string | undefined): void{
    if (typeof id !== "string" || !id.trim()) {
      throw new Error("ID inválido");
    }
  }
}