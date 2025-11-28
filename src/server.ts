import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import { prisma } from './utils/prisma.js';
import { UserController } from './controller/UserController.js';

const userController = new UserController();

const app = express();
const PORT = 3000;
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:4200' 
}));

app.get("/branded/users", userController.findAll.bind(userController));
app.get("/branded/users/:id", userController.findById.bind(userController));
app.post("/branded/users", userController.createUser.bind(userController));
app.put("/branded/users/:id", userController.updateUser.bind(userController));
app.delete("/branded/users/:id", userController.deleteById.bind(userController));

app.listen(PORT, () => { console.log(`Servidor rodando em http://localhost:${PORT}`)});