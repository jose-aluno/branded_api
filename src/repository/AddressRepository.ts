import { Prisma, Address } from "@prisma/client";
import { prisma } from "../utils/prisma.js";

export class AddressRepository {
  private static instance: AddressRepository;

  static getInstance(): AddressRepository {
    if (!this.instance) {
      this.instance = new AddressRepository();
    }
    return this.instance;
  }

  async findAll(): Promise<Address[]> {
    return await prisma.address.findMany();
  }

  async findById(id: string): Promise<Address | null> {
    return await prisma.address.findUnique({where: {id}});
  }

  async createAddress(addressData: Prisma.AddressCreateInput): Promise<Address | null> {
    const address = await prisma.address.create({data: addressData});
    console.log("Endereço criado com sucesso: ", address);
    return address;
  }

  async updateAddress(id: string, addressData: Prisma.AddressUpdateInput): Promise<Address | null> {
    const updatedAddress = await prisma.address.update({where: {id}, data: addressData});
    console.log("Endereço atualizado com sucesso: ", updatedAddress);
    return updatedAddress;
  }

  async deleteById(id: string): Promise<Address | null> {
    const deletedAddress = await prisma.address.delete({where: {id}});
    console.log("Endereço removido com sucesso: ", deletedAddress);
    return deletedAddress;
  }
}