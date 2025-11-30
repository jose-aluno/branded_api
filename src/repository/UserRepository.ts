import { Prisma, User } from "../generated/prisma/client.js";
import { prisma } from "../utils/prisma.js"

export class UserRepository{
  private static instance: UserRepository;

  static getInstance(): UserRepository {
    if (!this.instance) {
      this.instance = new UserRepository();
    }
    return this.instance;
  }

  async findAll(): Promise<User[]> {
    return await prisma.user.findMany();
  }

  async findById(id: string): Promise<User | null> {
    return await prisma.user.findUnique({where: {id}});
  }

  async createUser(userData: Prisma.UserCreateInput): Promise<User | null> {
    const user = await prisma.user.create({data: userData});
    console.log("Usuário criado com sucesso: ", user);
    return user;
  }

  async updateUser(id: string, userData: Prisma.UserUpdateInput): Promise<User | null> {
    const updatedUser = await prisma.user.update({where: {id}, data: userData});
    console.log("Usuário atualizado com sucesso: ", updatedUser);
    return updatedUser;
  }

  async deleteById(id: string): Promise<User | null> {
    const deletedUser = await prisma.user.delete({where: {id}});
    console.log("Usuário removido com sucesso: ", deletedUser);
    return deletedUser;
  }
}