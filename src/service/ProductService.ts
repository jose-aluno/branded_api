import { Prisma, Product } from "../generated/prisma/index.js";
import { ProductRepository } from "../repository/ProductRepository.js";

export class ProductService {
  private productRepository = ProductRepository.getInstance();

  async findAll(): Promise<Product[]> {
    return await this.productRepository.findAll();
  }

  async findById(id: string | undefined): Promise<Product> {
    this.validarId(id);
    const product = await this.productRepository.findById(id!);

    if(!product){
      throw new Error("Produto não encontrado");
    }
    return product;
  }

  async createProduct(userData: Prisma.ProductCreateInput): Promise<Product | null> {
    return await this.productRepository.createProduct(userData);
  }

  async updateProduct(id: string | undefined, productData: Prisma.ProductUpdateInput): Promise<Product | null> {
    this.validarId(id);
    return await this.productRepository.updateProduct(id!, productData);
  }

  async deleteById(id: string | undefined): Promise<Product | null> {
    this.validarId(id);
    return await this.productRepository.deleteById(id!);
  }

  validarId(id: string | undefined): void{
    if (typeof id !== "string" || !id.trim()) {
      throw new Error("ID inválido");
    }
  }
}