import { Prisma, Cart } from "@prisma/client";
import { prisma } from "../utils/prisma.js";

type CartWithItems = Prisma.CartGetPayload<{
  include: {
    items: {
      include: { product: true }
    }
  }
}>;

export class CartRepository {
  private static instance: CartRepository;

  static getInstance(): CartRepository {
    if (!this.instance) {
      this.instance = new CartRepository();
    }
    return this.instance;
  }

  async findByUserId(userId: string): Promise<CartWithItems | null> {
    return await prisma.cart.findUnique({
      where: { 
        userId: userId 
      },
      include: {
        items: {
          orderBy: {
            id: 'asc'
          },
          include: {
            product: true
          }
        }
      }
    });
  }

  async createCart(cartData: Prisma.CartCreateInput): Promise<Cart | null> {
    const cart = await prisma.cart.create({ data: cartData });
    console.log("Carrinho criado com sucesso: ", cart);
    return cart;
  }

  async updateCart(id: string, cartData: Prisma.CartUpdateInput): Promise<Cart | null> {
    const updatedCart = await prisma.cart.update({ where: { id }, data: cartData });
    console.log("Carrinho atualizado com sucesso: ", updatedCart);
    return updatedCart;
  }

  async recalculateTotal(cartId: string): Promise<void> {
    const items = await prisma.cartItem.findMany({
      where: { cartId: cartId },
      include: { product: true }
    });

    const total = items.reduce((acc, item) => {
      return acc + (item.product.price * item.quantity);
    }, 0);

    await prisma.cart.update({
      where: { id: cartId },
      data: { totalValue: total }
    });
  }
}
