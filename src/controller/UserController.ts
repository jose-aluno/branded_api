import { Request, Response } from "express";
import { UserService } from "../service/UserService.js";

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

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await this.userService.createUser(req.body);
      if (!user) {
        throw new Error("Erro ao criar usuário no banco de dados.");
      }

      const { password, ...userWithoutPassword } = user;
      res.status(201).json({
        message: "Usuário cadastrado com sucesso!",
        user: userWithoutPassword,
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

  async login(req:Request,res:Response): Promise<void>{
    try{
      const {token,user} = await this.userService.login(req.body);
      res.status(200).json({
        message: "Login realizado com sucesso!",
        token: token,
        userId: user.id,
        userName: user.name
      })
    }catch(error: unknown){
      let message = "Erro no login";
      if(error instanceof Error){
        message = error.message;
      }
      res.status(401).json({message: message});
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
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

  async deleteById(req: Request, res: Response): Promise<void> {
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