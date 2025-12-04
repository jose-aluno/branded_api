import { Prisma, CartItem } from "@prisma/client";
import { CartItemRepository } from "../repository/CartItemRepository.js";

export class CartItemService {
  private cartItemRepository = CartItemRepository.getInstance();

 async findAllByUserId(userId: string | undefined): Promise<CartItem[]> {
    if (!userId) throw new Error("Usuário não identificado.");
    return await this.cartItemRepository.findAllByUserId(userId);
  }

  async findById(id: string | undefined, userId: string | undefined): Promise<CartItem> {
    this.validarId(id);
    if (!userId) throw new Error("Usuário não identificado.");

    const cartItem = await this.cartItemRepository.findByIdAndUserId(id!, userId);

    if (!cartItem) {
      throw new Error("Item do carrinho não encontrado ou acesso negado.");
    }
    return cartItem;
  }

async createCartItem(data: { productId: string; quantity: number; userId: string }): Promise<CartItem> {
    if (!data.userId) throw new Error("Usuário não identificado.");

    let cart = await this.cartItemRepository.findCartByUserId(data.userId);

    if (!cart) {
      cart = await this.cartItemRepository.createCartForUser(data.userId);
    }

    const prismaData: Prisma.CartItemCreateInput = {
      quantity: data.quantity,
      cart: { connect: { id: cart.id } },
      product: { connect: { id: data.productId } }
    };

    return await this.cartItemRepository.createCartItem(prismaData);
  }

  async updateCartItem(
    id: string | undefined, 
    userId: string | undefined, 
    data: Prisma.CartItemUpdateInput
  ): Promise<CartItem> {
    this.validarId(id);
    if (!userId) throw new Error("Usuário não identificado.");

    const exists = await this.cartItemRepository.findByIdAndUserId(id!, userId);
    if (!exists) {
      throw new Error("Item não encontrado ou você não tem permissão para alterá-lo.");
    }

    return await this.cartItemRepository.updateCartItem(id!, data);
  }

  async deleteById(id: string | undefined, userId: string | undefined): Promise<CartItem> {
    this.validarId(id);
    if (!userId) throw new Error("Usuário não identificado.");

    const exists = await this.cartItemRepository.findByIdAndUserId(id!, userId);
    if (!exists) {
      throw new Error("Item não encontrado ou você não tem permissão para removê-lo.");
    }
    return await this.cartItemRepository.deleteById(id!);
  }

  private validarId(id: string | undefined): void {
    if (typeof id !== "string" || !id.trim()) {
      throw new Error("ID inválido");
    }
  }
}
