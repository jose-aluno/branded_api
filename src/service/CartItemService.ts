import { Prisma, CartItem } from "@prisma/client";
import { CartItemRepository } from "../repository/CartItemRepository.js";

export class CartItemService {
  private cartItemRepository = CartItemRepository.getInstance();

  async findAll(): Promise<CartItem[]> {
    return await this.cartItemRepository.findAll();
  }

  async findById(id: string | undefined): Promise<CartItem> {
    this.validarId(id);
    const cartItem = await this.cartItemRepository.findById(id!);

    if (!cartItem) {
      throw new Error("Item do carrinho não encontrado");
    }
    return cartItem;
  }

  async createCartItem(cartItemData: Prisma.CartItemCreateInput): Promise<CartItem | null> {
    return await this.cartItemRepository.createCartItem(cartItemData);
  }

  async updateCartItem(id: string | undefined, cartItemData: Prisma.CartItemUpdateInput): Promise<CartItem | null> {
    this.validarId(id);

    const exists = await this.cartItemRepository.findById(id!);
    if (!exists) {
      throw new Error("Item do carrinho não encontrado");
    }

    return await this.cartItemRepository.updateCartItem(id!, cartItemData);
  }

  async deleteById(id: string | undefined): Promise<CartItem | null> {
    this.validarId(id);

    const exists = await this.cartItemRepository.findById(id!);
    if (!exists) {
      throw new Error("Item do carrinho não encontrado");
    }

    return await this.cartItemRepository.deleteById(id!);
  }

  private validarId(id: string | undefined): void {
    if (typeof id !== "string" || !id.trim()) {
      throw new Error("ID inválido");
    }
  }
}
