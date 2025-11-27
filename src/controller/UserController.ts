import { Request, Response } from "express";
import { UserService } from "../service/userService.js";

export class UserController{
  private userService = new UserService();

  async findAll(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.userService.findAll();
      res.status(200).json(users);
    } catch (error: unknown) {
      let message: string = "Não foi possível listar os usuários!";
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
      const user = await this.userService.findById(id);
      res.status(200).json(user);
    } catch (error: unknown) {
      let message = "Não foi possível encontrar usuário com esse id!";
      if (error instanceof Error) {
        message = error.message;
      }
      res.status(400).json({
        message: message,
      });
    }
  }

  async cadastrarUsuario(req: Request, res: Response): Promise<void> {
    try {
      const user = await this.userService.createUser(req.body);
      res.status(201).json({
        message: "Usuário cadastrado com sucesso!",
        user: user,
      });
    } catch (error: unknown) {
      let message = "Não foi possível cadastrar usuário!";
      if (error instanceof Error) {
        message = error.message;
      }
      res.status(400).json({
        message: message,
      });
    }
  }

  async atualizarUsuario(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const user = await this.userService.updateUser(id, req.body);
      res.status(200).json({
        message: "Usuário atualizado com sucesso!",
        user: user
      })
    }catch(error: unknown){
      let message = "Não foi possível atualizar usuário!"
      if(error instanceof Error){
        message = error.message;
      }
      res.status(400).json({
        message: message
      })
    }
  }

  async removerUsuario(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const user = await this.userService.deleteById(id);
      res.status(200).json({
        message: "Usuário removido com sucesso!!!",
        user: user,
      });
    } catch (error: unknown) {
      let message = "Não foi possível excluir usuário!!!";
      if (error instanceof Error) {
        message = error.message;
      }
      res.status(400).json({
        message: message,
      });
    }
  }
}