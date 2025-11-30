import { Request, Response } from "express";
import { OrderService } from "../service/OrderService.js";

export class OrderController{
  private orderService = new OrderService();

  async findByUserId(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      if (!userId) {
        res.status(400).json({ message: "ID do usuário não fornecido!" });
        return; 
      }
      const order = await this.orderService.findByUserId(userId);
      res.status(200).json(order);
    } catch (error: unknown) {
      let message = "Não foi possível encontrar pedidos desse id!";
      if (error instanceof Error) {
        message = error.message;
      }
      res.status(400).json({
        message: message,
      });
    }
  }

  async createOrder(req: Request, res: Response): Promise<void> {
    try {
      const order = await this.orderService.createOrder(req.body);
      res.status(201).json({
        message: "Pedido cadastrado com sucesso!",
        order: order,
      });
    } catch (error: unknown) {
      let message = "Não foi possível cadastrar pedido!";
      if (error instanceof Error) {
        message = error.message;
      }
      res.status(400).json({
        message: message,
      });
    }
  }
}