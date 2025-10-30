const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

// 🔐 Segurança opcional com chave de API
const API_KEY = process.env.API_KEY || "lovable_2025_secret";
app.use((req, res, next) => {
  const key = req.headers["x-api-key"];
  if (key !== API_KEY) {
    return res.status(403).json({ error: "Acesso não autorizado" });
  }
  next();
});

// 🔍 Rota principal de teste
app.get("/", (req, res) => {
  res.json({ message: "DeepSite API está online!" });
});

// 🧠 Exemplo de rota que o Lovable pode usar
app.post("/analisar", (req, res) => {
  const { texto } = req.body;

  if (!texto) {
    return res.status(400).json({ erro: "Envie o campo 'texto' no corpo da requisição" });
  }

  // Aqui seria o processamento real do DeepSite
  const resultado = `Texto recebido e processado com sucesso: ${texto}`;

  res.json({ sucesso: true, resultado });
});

// 🚀 Inicialização do servidor
const server = app.listen(port, () => console.log(`DeepSite rodando na porta ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
