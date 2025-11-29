  import { Prisma, Cart } from "../generated/prisma/client.js";
  import { prisma } from "../utils/prisma.js";

  export class CartRepository {
    private static instance: CartRepository;

    static getInstance(): CartRepository {
      if (!this.instance) {
        this.instance = new CartRepository();
      }
      return this.instance;
    }

    async findById(id: string): Promise<Cart | null> {
      return await prisma.cart.findUnique({where: {id}});
    }

    async createCart(cartData: Prisma.CartCreateInput): Promise<Cart | null> {
      const cart = await prisma.cart.create({data: cartData});
      console.log("Carrinho criado com sucesso: ", cart);
      return cart;
    }

    async updateCart(id: string, cartData: Prisma.CartUpdateInput): Promise<Cart | null> {
      const updatedCart = await prisma.cart.update({where: {id}, data: cartData});
      console.log("Carrinho atualizado com sucesso: ", updatedCart);
      return updatedCart;
    }
  }