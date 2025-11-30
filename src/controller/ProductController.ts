import { Request, Response } from "express";
import { ProductService } from "../service/ProductService.js";

export class ProductController{
  private productService = new ProductService();

  async findAll(req: Request, res: Response): Promise<void> {
    try {
      const products = await this.productService.findAll();
      res.status(200).json(products);
    } catch (error: unknown) {
      let message: string = "Não foi possível listar os produtos!";
      if (error instanceof Error) {
        message = error.message;
      }
      res.status(400).json({
        message: message,
      });
    }
  }

  async findById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const product = await this.productService.findById(id);
      res.status(200).json(product);
    } catch (error: unknown) {
      let message = "Não foi possível encontrar produto com esse id!";
      if (error instanceof Error) {
        message = error.message;
      }
      res.status(400).json({
        message: message,
      });
    }
  }

  async createProduct(req: Request, res: Response): Promise<void> {
    try {
      const product = await this.productService.createProduct(req.body);
      res.status(201).json({
        message: "Produto cadastrado com sucesso!",
        product: product,
      });
    } catch (error: unknown) {
      let message = "Não foi possível cadastrar produto!";
      if (error instanceof Error) {
        message = error.message;
      }
      res.status(400).json({
        message: message,
      });
    }
  }

async updateProduct(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const product = await this.productService.updateProduct(id, req.body);
      res.status(200).json({
        message: "Produto atualizado com sucesso!",
        product: product
      })
    }catch(error: unknown){
      let message = "Não foi possível atualizar produto!"
      if(error instanceof Error){
        message = error.message;
      }
      res.status(400).json({
        message: message
      })
    }
  }

  async deleteById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const product = await this.productService.deleteById(id);
      res.status(200).json({
        message: "Produto removido com sucesso!",
        product: product,
      });
    } catch (error: unknown) {
      let message = "Não foi possível excluir produto!";
      if (error instanceof Error) {
        message = error.message;
      }
      res.status(400).json({
        message: message,
      });
    }
  }
}