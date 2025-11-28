import { Prisma, Product } from "../generated/prisma/index.js";
import { prisma } from "../utils/prisma.js";

export class ProductRepository{
  private static instance: ProductRepository;

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
    return await prisma.product.findUnique({where: {id}})
  }

  async createProduct(productData: Prisma.ProductCreateInput): Promise<Product | null> {
    const product = await prisma.product.create({data: productData});
    console.log("Produto criado com sucesso: ", product);
    return product;
  }

  async updateProduct(id: string, productData: Prisma.ProductUpdateInput): Promise<Product | null> {
    const updatedProduct = await prisma.product.update({where: {id}, data: productData});
    console.log("Produto atualizado com sucesso: ", updatedProduct);
    return updatedProduct;
  }

  async deleteById(id: string): Promise<Product | null> {
    const deletedProduct = await prisma.product.delete({where: {id}});
    console.log("Produto removido com sucesso: ", deletedProduct);
    return deletedProduct;
  }
}