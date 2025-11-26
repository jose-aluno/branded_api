import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:4200' 
}));

app.get('/', (req, res) => {
    res.json({ mensagem: 'API Express rodando' });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});