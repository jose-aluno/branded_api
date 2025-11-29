import { Prisma, Cart } from "../generated/prisma/index.js";
import { CartRepository } from "../repository/CartRepository.js";

export class CartService {
  private cartRepository = CartRepository.getInstance();

  async findById(userId: string | undefined): Promise<Cart> {
    this.validarId(userId);
    const cart = await this.cartRepository.findByUserId(userId!);

    if(!cart){
      throw new Error("Carrinho não encontrado");
    }
    return cart;
  }

  async createCart(cartData: Prisma.CartCreateInput): Promise<Cart | null> {
    return await this.cartRepository.createCart(cartData);
  }

  async updateCart(userId: string | undefined, cartData: Prisma.CartUpdateInput): Promise<Cart | null> {
    this.validarId(userId);

    const exists = await this.cartRepository.findByUserId(userId!);
    if (!exists) {
      throw new Error("Carrinho não encontrado");
    }

    return await this.cartRepository.updateCart(userId!, cartData);
  }

  private validarId(id: string | undefined): void{
    if (typeof id !== "string" || !id.trim()) {
      throw new Error("ID inválido");
    }
  }
}