import { Prisma, CartItem } from "@prisma/client";
import { prisma } from "../utils/prisma.js";

export class CartItemRepository {
  private static instance: CartItemRepository;

  static getInstance(): CartItemRepository {
    if (!this.instance) {
      this.instance = new CartItemRepository();
    }
    return this.instance;
  }

  async findAll(): Promise<CartItem[]> {
    return await prisma.cartItem.findMany();
  }

  async findById(id: string): Promise<CartItem | null> {
    return await prisma.cartItem.findUnique({ where: { id } });
  }

  async createCartItem(cartItemData: Prisma.CartItemCreateInput): Promise<CartItem | null> {
    const cartItem = await prisma.cartItem.create({ data: cartItemData });
    console.log("Item do carrinho criado com sucesso: ", cartItem);
    return cartItem;
  }

  async updateCartItem(id: string, cartItemData: Prisma.CartItemUpdateInput): Promise<CartItem | null> {
    const updatedCartItem = await prisma.cartItem.update({ where: { id }, data: cartItemData });
    console.log("Item do carrinho atualizado com sucesso: ", updatedCartItem);
    return updatedCartItem;
  }

  async deleteById(id: string): Promise<CartItem | null> {
    const deletedCartItem = await prisma.cartItem.delete({ where: { id } });
    console.log("Item do carrinho removido com sucesso: ", deletedCartItem);
    return deletedCartItem;
  }
}
