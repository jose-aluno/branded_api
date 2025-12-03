import { Prisma, User } from "@prisma/client";
import { UserRepository } from "../repository/UserRepository.js";

export class UserService {
  private userRepository = UserRepository.getInstance();

  async findAll(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  async findById(id: string | undefined): Promise<User> {
    if (!id) {
      throw new Error("Usuário não encontrado");
    }

    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error("Usuário não encontrado");
    }
    return user;
  }

  async createUser(userData: Prisma.UserCreateInput): Promise<User | null> {
    return await this.userRepository.createUser(userData);
  }

  async updateUser(id: string | undefined, userData: Prisma.UserUpdateInput): Promise<User | null> {
    if (!id) {
      throw new Error("Usuário não encontrado");
    }

    return await this.userRepository.updateUser(id, userData);
  }

  async deleteById(id: string | undefined): Promise<User | null> {
    if (!id) {
      throw new Error("Usuário não encontrado");
    }

    return await this.userRepository.deleteById(id);
  }
}
