import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import { UserController } from './controller/UserController.js';
import { ProductController } from './controller/ProductController.js';
import { AddressController } from './controller/AddressController.js';
import { CartItemController } from './controller/ItemCartController.js';
import { CartController } from './controller/CartController.js';
import { OrderController } from './controller/OrderController.js';
import { authMiddleware } from './middleware/authMiddleware.js';

const userController = new UserController();
const productController = new ProductController();
const addressController = new AddressController();
const cartController = new CartController();
const orderController = new OrderController();
const cartItemController = new CartItemController();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.use(cors());

app.get("/branded/users", userController.findAll.bind(userController));
app.get("/branded/users/:id", userController.findById.bind(userController));
app.post("/branded/users", userController.createUser.bind(userController));
app.post("/branded/login", userController.login.bind(userController));
app.put("/branded/users/:id", userController.updateUser.bind(userController));
app.delete("/branded/users/:id", userController.deleteById.bind(userController));

app.get("/branded/products", productController.findAll.bind(productController));
app.get("/branded/products/:id", productController.findById.bind(productController));
app.post("/branded/products", productController.createProduct.bind(productController));
app.put("/branded/products/:id", productController.updateProduct.bind(productController));
app.delete("/branded/products/:id", productController.deleteById.bind(productController));

app.get("/branded/address", addressController.findAll.bind(addressController));
app.get("/branded/address/:id", addressController.findById.bind(addressController));
app.post("/branded/address", addressController.createAddress.bind(addressController));
app.put("/branded/address/:id", addressController.updateAddress.bind(addressController));
app.delete("/branded/address/:id", addressController.deleteById.bind(addressController));

app.get("/branded/cart", authMiddleware, cartController.findByUserId.bind(cartController));
app.post("/branded/cart", authMiddleware, cartController.createCart.bind(cartController));
app.put("/branded/cart",authMiddleware, cartController.updateCart.bind(cartController));

app.get("/branded/orders",authMiddleware, orderController.findByUserId.bind(orderController));
app.post("/branded/orders",authMiddleware, orderController.createOrder.bind(orderController));
app.post("/branded/checkout", authMiddleware, orderController.checkout.bind(orderController));

app.get("/branded/cartItem",authMiddleware, cartItemController.findAll.bind(cartItemController));
app.get("/branded/cartItem/:id",authMiddleware, cartItemController.findById.bind(cartItemController));
app.post("/branded/cartItem",authMiddleware, cartItemController.createCartItem.bind(cartItemController));
app.put("/branded/cartItem/:id",authMiddleware, cartItemController.updateCartItem.bind(cartItemController));
app.delete("/branded/cartItem/:id",authMiddleware, cartItemController.deleteById.bind(cartItemController));

app.listen(PORT, () => { console.log(`Servidor rodando em http://localhost:${PORT}`)});