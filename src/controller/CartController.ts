import { Request, Response } from "express";
import { CartService } from "../service/CartService.js";

export class CartController{
  private cartService = new CartService();


  async findByUserId(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.userId;
      const cart = await this.cartService.findById(userId);
      res.status(200).json(cart);
    } catch (error: unknown) {
      let message = "Não foi possível encontrar o carrinho com esse id!";
      if (error instanceof Error) {
        message = error.message;
      }
      res.status(400).json({
        message: message,
      });
    }
  }

  async createCart(req: Request, res: Response): Promise<void> {
    try {
      const cart = await this.cartService.createCart(req.body);
      res.status(201).json({
        message: "Carrinho cadastrado com sucesso!",
        cart: cart,
      });
    } catch (error: unknown) {
      let message = "Não foi possível cadastrar o carrinho!";
      if (error instanceof Error) {
        message = error.message;
      }
      res.status(400).json({
        message: message,
      });
    }
  }

  async updateCart(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.userId;
      const cart = await this.cartService.updateCartByUserId(userId, req.body);
      res.status(200).json({
        message: "Carrinho atualizado com sucesso!",
        cart: cart
      })
    }catch(error: unknown){
      let message = "Não foi possível atualizar o carrinho!"
      if(error instanceof Error){
        message = error.message;
      }
      res.status(400).json({
        message: message
      })
    }
  }
}