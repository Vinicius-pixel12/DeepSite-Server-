// app.js

const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3001;

// Permitir leitura de JSON no body
app.use(express.json());

// 📌 Configuração do CORS
app.use(cors({
  origin: 'https://dashproo.com.br/auth', // Substitua pelo domínio do seu SaaS ou Lovable
  methods: ['GET','POST'],
  allowedHeaders: ['Content-Type','x-api-key']
}));

// 📌 Validação da API Key
app.use((req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== 'lovable_secret_2025') { // Substitua pela sua chave API
    return res.status(401).json({ error: 'Acesso não autorizado' });
  }
  next();
});

// 📌 Endpoints de exemplo

// GET simples
app.get('/api/dados', (req, res) => {
  res.json({ mensagem: 'API funcionando!' });
});

// POST de exemplo
app.post('/api/dados', (req, res) => {
  const { nome, idade } = req.body;
  res.json({ mensagem: `Recebido: ${nome}, ${idade} anos` });
});

// 📌 Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
