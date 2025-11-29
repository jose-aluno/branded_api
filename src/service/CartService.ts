import { Prisma, Cart } from "../generated/prisma/index.js";
import { CartRepository } from "../repository/CartRepository.js";

export class CartService {
  private cartRepository = CartRepository.getInstance();

  async findById(id: string | undefined): Promise<Cart> {
    this.validarId(id);
    const cart = await this.cartRepository.findById(id!);

    if(!cart){
      throw new Error("Carrinho não encontrado");
    }
    return cart;
  }

  async createCart(cartData: Prisma.CartCreateInput): Promise<Cart | null> {
    return await this.cartRepository.createCart(cartData);
  }

  async updateCart(id: string | undefined, cartData: Prisma.CartUpdateInput): Promise<Cart | null> {
    this.validarId(id);

    const exists = await this.cartRepository.findById(id!);
    if (!exists) {
      throw new Error("Carrinho não encontrado");
    }

    return await this.cartRepository.updateCart(id!, cartData);
  }

  private validarId(id: string | undefined): void{
    if (typeof id !== "string" || !id.trim()) {
      throw new Error("ID inválido");
    }
  }
}