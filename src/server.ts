import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { prisma } from './utils/prisma.js';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:4200' 
}));

app.get('/', async (req, res) => {
    res.json(await prisma.user.findMany());
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});