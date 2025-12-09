import { Prisma, CartItem, Cart } from "@prisma/client";
import { prisma } from "../utils/prisma.js";

export class CartItemRepository {
  private static instance: CartItemRepository;

  static getInstance(): CartItemRepository {
    if (!this.instance) {
      this.instance = new CartItemRepository();
    }
    return this.instance;
  }

  async findAllByUserId(userId: string): Promise<CartItem[]> {
    return await prisma.cartItem.findMany({
      where: {
        cart: {
          userId: userId,
        },
      },
      include: {
        product: true
      }
    });
  }

  async findByIdAndUserId(id: string, userId: string): Promise<CartItem | null> {
    return await prisma.cartItem.findFirst({
      where: {
        id: id,
        cart: {
          userId: userId,
        },
      },
    });
  }

  async createCartItem(cartItemData: Prisma.CartItemCreateInput): Promise<CartItem> {
    const cartItem = await prisma.cartItem.create({ data: cartItemData });
    console.log("Item do carrinho criado com sucesso: ", cartItem);
    return cartItem;
  }

  async updateCartItem(id: string, cartItemData: Prisma.CartItemUpdateInput): Promise<CartItem> {
    const updatedCartItem = await prisma.cartItem.update({ where: { id }, data: cartItemData });
    console.log("Item do carrinho atualizado com sucesso: ", updatedCartItem);
    return updatedCartItem;
  }

  async deleteById(id: string): Promise<CartItem> {
    const deletedCartItem = await prisma.cartItem.delete({ where: { id } });
    console.log("Item do carrinho removido com sucesso: ", deletedCartItem);
    return deletedCartItem;
  }

  // verificar se realmente é necessario essa criação
  async createCartForUser(userId: string): Promise<Cart> {
    return await prisma.cart.create({
      data: {
        userId: userId,
        totalValue: 0
      }
    });
  }

  async findCartByUserId(userId: string): Promise<Cart | null> {
    return await prisma.cart.findUnique({
      where: { userId: userId },
    });
  }

  async findByCartIdAndProductId(cartId: string, productId: string): Promise<CartItem | null> {
  return await prisma.cartItem.findFirst({
    where: {
      cartId: cartId,
      productId: productId
      }
    });
  }

  async findCartsByProductId(productId: string): Promise<{ cartId: string | null }[]> {
    return await prisma.cartItem.findMany({
      where: { 
        productId: productId,
        cartId: { not: null }
      },
      select: {
        cartId: true
      },
      distinct: ['cartId']
    });
  }
  
}
