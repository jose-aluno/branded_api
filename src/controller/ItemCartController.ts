import { Request, Response } from "express";
import { CartItemService } from "../service/CartItemService.js";

export class CartItemController{
  private cartItemService = new CartItemService();

  async findAll(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.userId;
      const cartItem = await this.cartItemService.findAllByUserId(userId);
      res.status(200).json(cartItem);
    } catch (error: unknown) {
      let message: string = "Não foi possível listar os itens do carrinho no sistema!";
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
      const userId = req.userId;
      const cartItem = await this.cartItemService.findById(id,userId);
      res.status(200).json(cartItem);
    } catch (error: unknown) {
      let message = "Não foi possível encontrar item do carrinho com esse id!";
      if (error instanceof Error) {
        message = error.message;
      }
      res.status(400).json({
        message: message,
      });
    }
  }

  async createCartItem(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.userId;

      if (!userId) {
         res.status(401).json({ message: "Usuário não autenticado" });
         return;
      }

      const cartItem = await this.cartItemService.createCartItem({
        ...req.body,
        userId: userId
      });

      res.status(201).json({
        message: "Item cadastrado com sucesso no carrinho!",
        cartItem: cartItem,
      });
    } catch (error: unknown) {
      let message = "Não foi possível cadastrar o item no carrinho!";
      if (error instanceof Error) {
        message = error.message;
      }
      res.status(400).json({
        message: message,
      });
    }
  }

  async updateCartItem(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userId = req.userId;
      const cartItem = await this.cartItemService.updateCartItem(id,userId, req.body);
      res.status(200).json({
        message: "Item do carrinho atualizado com sucesso!",
        cartItem: cartItem
      })
    }catch(error: unknown){
      let message = "Não foi possível atualizar item no carrinho!"
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
      const userId = req.userId;
      
      const cartItem = await this.cartItemService.deleteById(id,userId);
      res.status(200).json({
        message: "Item removido do carrinho com sucesso!",
        cartItem: cartItem,
      });
    } catch (error: unknown) {
      let message = "Não foi possível excluir item do carrinho!";
      if (error instanceof Error) {
        message = error.message;
      }
      res.status(400).json({
        message: message,
      });
    }
  }
}