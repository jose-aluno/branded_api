import { Request, Response } from "express";
import { OrderService } from "../service/OrderService.js";

export class OrderController{
  private orderService = new OrderService();

  async findUserById(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      const order = await this.orderService.findByUserId(userId);
      res.status(200).json(order);
    } catch (error: unknown) {
      let message = "Não foi possível encontrar pedido com esse id!";
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