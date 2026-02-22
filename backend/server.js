import express from "express";
import cors from "cors";
import db from "./db.js";

const app = express();

app.use(cors());
app.use(express.json());

/* =========================
   ROTA 1 — LISTAR PRODUTOS
========================= */
app.get("/produtos", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM products_gustavo");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* =========================
   ROTA 2 — CADASTRAR PRODUTO
========================= */
app.post("/produtos", async (req, res) => {
  try {
    const { nome, preco, descricao } = req.body;

    // validação básica
    if (!nome || !preco) {
      return res.status(400).json({
        error: "Nome e preço são obrigatórios"
      });
    }

    await db.query(
      "INSERT INTO products_gustavo (nome, preco, descricao) VALUES (?, ?, ?)",
      [nome, preco, descricao]
    );

    res.json({ message: "Produto cadastrado!" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* =========================
   ROTA 3 — DELETAR PRODUTO
========================= */
app.delete("/produtos/:id", async (req, res) => {
  try {
    await db.query(
      "DELETE FROM products_gustavo WHERE id = ?",
      [req.params.id]
    );

    res.json({ message: "Produto deletado!" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* =========================
   INICIAR SERVIDOR
========================= */
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});