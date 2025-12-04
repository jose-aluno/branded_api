import { Prisma, User } from "@prisma/client";
import { UserRepository } from "../repository/UserRepository.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRECT = "supercraft";

interface LoginResponse {
  token: string;
  user: User;
}

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

  async createUser(userData: any): Promise<User | null> {
    const {name,email,password,address} = userData;

    const existingUser = await this.userRepository.findByEmail(email);
    if(existingUser){
      throw new Error("Email ja cadastrado");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    const userCreateInput: Prisma.UserCreateInput  = {
      name,
      email,
      password: hashedPassword,
      address,
      cart: {
        create :{
          totalValue:0
        }
      }
    };

    return await this.userRepository.createUser(userData);
  }

  async login(loginData: any): Promise<LoginResponse>{
    const{email,password} = loginData;

    const user = await this.userRepository.findByEmail(email);
    if(!user){
      throw new Error("Email ou senha invalidos");
    }

    const isPasswordValid = await bcrypt.compare(password,user.password);
    if(!isPasswordValid){
      throw new Error("Email ou senha invalidos");
    }

    const token = jwt.sign({id:user.id}, JWT_SECRECT,{
      expiresIn: "1d",
    });

    return {token,user};
  }

  async updateUser(id: string | undefined, userData: Prisma.UserUpdateInput): Promise<User | null> {
    if (!id) {
      throw new Error("Usuário não encontrado");
    }

    if (userData.password && typeof userData.password === 'string') {
        const salt = await bcrypt.genSalt(10);
        userData.password = await bcrypt.hash(userData.password, salt);
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
