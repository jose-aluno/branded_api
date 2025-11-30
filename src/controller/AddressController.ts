import { Request, Response } from "express";
import { AddressService } from "../service/AddressService.js";

export class AddressController {
  private addressService = new AddressService();

  async findAll(req: Request, res: Response): Promise<void> {
    try {
      const address = await this.addressService.findAll();
      res.status(200).json(address);
    } catch (error: unknown) {
      let message: string = "Não foi possível listar os endereços!";
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
      const address = await this.addressService.findById(id);
      res.status(200).json(address);
    } catch (error: unknown) {
      let message = "Não foi possível encontrar endereço com esse id!";
      if (error instanceof Error) {
        message = error.message;
      }
      res.status(400).json({
        message: message,
      });
    }
  }

  async createAddress(req: Request, res: Response): Promise<void> {
    try {
      const address = await this.addressService.createAddress(req.body);
      res.status(201).json({
        message: "Endereço cadastrado com sucesso!",
        address: address,
      });
    } catch (error: unknown) {
      let message = "Não foi possível cadastrar endereço!";
      if (error instanceof Error) {
        message = error.message;
      }
      res.status(400).json({
        message: message,
      });
    }
  }

  
  async updateAddress(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const address = await this.addressService.updateAddress(id, req.body);
      res.status(200).json({
        message: "Endereço atualizado com sucesso!",
        address: address
      })
    }catch(error: unknown){
      let message = "Não foi possível atualizar endereço!"
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
      const address = await this.addressService.deleteById(id);
      res.status(200).json({
        message: "Endereço removido com sucesso!",
        address: address,
      });
    } catch (error: unknown) {
      let message = "Não foi possível excluir endereço!";
      if (error instanceof Error) {
        message = error.message;
      }
      res.status(400).json({
        message: message,
      });
    }
  }
}