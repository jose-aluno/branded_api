import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import { UserController } from './controller/UserController.js';
import { ProductController } from './controller/ProductController.js';

const userController = new UserController();
const productController = new ProductController();
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

app.get("/branded/products", productController.findAll.bind(productController));
app.get("/branded/products/:id", productController.findById.bind(productController));
app.post("/branded/products", productController.createProduct.bind(productController));
app.put("/branded/products/:id", productController.updateProduct.bind(productController));
app.delete("/branded/products/:id", productController.deleteById.bind(productController));

app.listen(PORT, () => { console.log(`Servidor rodando em http://localhost:${PORT}`)});