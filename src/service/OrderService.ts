import { Prisma, Order } from "@prisma/client";
import { OrderRepository } from "../repository/OrderRepository.js";
import { prisma } from "../utils/prisma.js";
import { CartRepository } from "../repository/CartRepository.js";

export class OrderService {
  private orderRepository = OrderRepository.getInstance();
  private cartRepository = CartRepository.getInstance();

  async findByUserId(userId: string): Promise<Order[]> {
    this.validarId(userId);
    const orders = await this.orderRepository.findByUserId(userId);

    if (orders.length === 0) throw new Error("Nenhum pedido encontrado");

    return orders;
  }

  async createOrder(orderData: Prisma.OrderCreateInput): Promise<Order | null> {
    return await this.orderRepository.createOrder(orderData);
  }

  private validarId(id: string | undefined): void {
    if (typeof id !== "string" || !id.trim()) {
      throw new Error("ID inválido");
    }
  }

  async checkout(userId: string) {
    const cart = await this.cartRepository.findByUserId(userId);

    if (!cart) throw new Error("Carrinho não encontrado.");
    if (cart.items.length === 0) throw new Error("Carrinho vazio.");

    const result = await prisma.$transaction(async (tx) => {
      
      const newOrder = await tx.order.create({
        data: {
          userId: userId,
          totalValue: cart.totalValue,
        }
      });

      await tx.cartItem.updateMany({
        where: { cartId: cart.id },
        data: {
          cartId: null,
          orderId: newOrder.id
        }
      });

      await tx.cart.update({
        where: { id: cart.id },
        data: { totalValue: 0 }
      });

      return newOrder;
    });

    return result;
  }
}
