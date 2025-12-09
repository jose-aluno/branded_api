import { Prisma, Product } from "@prisma/client";
import { prisma } from "../utils/prisma.js";
import { CartRepository } from "./CartRepository.js";
import { CartItemRepository } from "./CartItemRepository.js";

export class ProductRepository {
  private static instance: ProductRepository;
  private cartRepository = CartRepository.getInstance();
  private cartItemRepository = CartItemRepository.getInstance();

  static getInstance(): ProductRepository {
    if (!this.instance) {
      this.instance = new ProductRepository();
    }
    return this.instance;
  }

  async findAll(): Promise<Product[]> {
    return await prisma.product.findMany();
  }

  async findById(id: string): Promise<Product | null> {
    return await prisma.product.findUnique({ where: { id } });
  }

  async createProduct(productData: Prisma.ProductCreateInput): Promise<Product | null> {
    const product = await prisma.product.create({ data: productData });
    console.log("Produto criado com sucesso: ", product);
    return product;
  }

  async updateProduct(id: string, productData: Prisma.ProductUpdateInput): Promise<Product | null> {
    const updatedProduct = await prisma.product.update({ where: { id }, data: productData });

    const affectedCarts = await this.cartItemRepository.findCartsByProductId(id);

    await Promise.all(
      affectedCarts.map(async (item) => {
        if (item.cartId) {
          await this.cartRepository.recalculateTotal(item.cartId);
        }
      })
    );

    return updatedProduct;
  }

  async deleteById(id: string): Promise<Product | null> {
    const deletedProduct = await prisma.product.delete({ where: { id } });
    console.log("Produto removido com sucesso: ", deletedProduct);
    return deletedProduct;
  }
}
