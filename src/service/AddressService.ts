import { Prisma, Address } from "../generated/prisma/index.js";
import { AddressRepository } from "../repository/AddressRepository.js";

export class AddressService {
  private addressRepository = AddressRepository.getInstance();

  async findAll(): Promise<Address[]> {
    return await this.addressRepository.findAll();
  }
  
  async findById(id: string | undefined): Promise<Address> {
    this.validarId(id);
    const address = await this.addressRepository.findById(id!);

    if(!address){
      throw new Error("Endereço não encontrado");
    }
    return address;
  }
  
  async createAddress(addressData: Prisma.AddressCreateInput): Promise<Address | null> {
    return await this.addressRepository.createAddress(addressData);
  }
  
  async updateAddress(id: string | undefined, addressData: Prisma.AddressUpdateInput): Promise<Address | null> {
    this.validarId(id);
    return await this.addressRepository.updateAddress(id!, addressData);
  }
  
  async deleteById(id: string | undefined): Promise<Address | null> {
    this.validarId(id);
    return await this.addressRepository.deleteById(id!);
  }
    
  private validarId(id: string | undefined): void{
    if (typeof id !== "string" || !id.trim()) {
      throw new Error("ID inválido");
    }
  }
}