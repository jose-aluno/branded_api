import { Prisma, CartItem } from "@prisma/client";
import { CartItemRepository } from "../repository/CartItemRepository.js";
import { CartRepository } from "../repository/CartRepository.js";

export class CartItemService {
  private cartItemRepository = CartItemRepository.getInstance();
  private cartRepository = CartRepository.getInstance();

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

    const existingItem = await this.cartItemRepository.findByCartIdAndProductId(cart.id, data.productId);

   if (existingItem) {
      const updatedItem = await this.cartItemRepository.updateCartItem(existingItem.id, {
        quantity: existingItem.quantity + data.quantity
      });

      await this.cartRepository.recalculateTotal(cart.id);

      return updatedItem;

    } else {
      const prismaData: Prisma.CartItemCreateInput = {
        quantity: data.quantity,
        cart: { connect: { id: cart.id } },
        product: { connect: { id: data.productId } }
      };
      
      const newItem = await this.cartItemRepository.createCartItem(prismaData);

      await this.cartRepository.recalculateTotal(cart.id);

      return newItem;
    }
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

    const updatedItem = await this.cartItemRepository.updateCartItem(id!, data);
    if (updatedItem.cartId) {
        await this.cartRepository.recalculateTotal(updatedItem.cartId);
    }
    return updatedItem;
  }

 async deleteById(id: string | undefined, userId: string | undefined): Promise<CartItem> {
    this.validarId(id);
    if (!userId) throw new Error("Usuário não identificado.");
    const itemToDelete = await this.cartItemRepository.findByIdAndUserId(id!, userId);
    
    if (!itemToDelete) {
      throw new Error("Item não encontrado ou você não tem permissão para removê-lo.");
    }
    const cartId = itemToDelete.cartId;

    const deletedItem = await this.cartItemRepository.deleteById(id!);
    if (cartId) {
      await this.cartRepository.recalculateTotal(cartId);
    }

    return deletedItem;
  }

  private validarId(id: string | undefined): void {
    if (typeof id !== "string" || !id.trim()) {
      throw new Error("ID inválido");
    }
  }
}
