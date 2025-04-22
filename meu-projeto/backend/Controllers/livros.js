import { db } from "../db.js";

// Buscar todos os livros
export const getLivros = (_, res) => {
  const q = "SELECT * FROM livros";

  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data);
  });
};

// Atualizar um livro
export const updateLivro = (req, res) => {
  const { titulo, autor, genero, ano } = req.body;
  const id = parseInt(req.params.idlivro);

  console.log("Tentando atualizar livro com id:", id);
  console.log("recebido:", { titulo, autor, genero, ano });

  const q = "UPDATE livros SET titulo = ?, autor = ?, genero = ?, ano = ? WHERE idlivro = ?";

  db.query(q, [titulo, autor, genero, ano, id], (err, result) => {
    if (err) {
      console.error("Erro na query:", err);
      return res.status(500).json(err);
    }

    console.log("Resultado da query:", result);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Livro não encontrado" });
    }

    return res.status(200).json({ message: "Livro atualizado com sucesso" });
  });
};

// Deletar um livro
export const deleteLivro = (req, res) => {
  const { idlivro } = req.params;

  const q = "DELETE FROM livros WHERE idlivro = ?";

  db.query(q, [idlivro], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Livro não encontrado" });
    }

    return res.status(200).json({ message: "Livro excluído com sucesso" });
  });
};

// Criar um novo livro
export const createLivro = (req, res) => {
  const { titulo, autor, genero, ano } = req.body;

  if (!titulo || !autor || !genero || !ano) {
    return res.status(400).json({ message: "Todos os campos são obrigatórios" });
  }

  const q = "INSERT INTO livros (titulo, autor, genero, ano) VALUES (?, ?, ?, ?)";

  db.query(q, [titulo, autor, genero, ano], (err, result) => {
    if (err) {
      console.error("Erro ao criar livro:", err);
      return res.status(500).json({ 
        message: "Erro ao criar livro", 
        error: err 
      });
    }

    return res.status(201).json({ 
      message: "Livro criado com sucesso", 
      idlivro: result.insertId 
    });
  });
};

// Buscar um livro específico
export const getLivro = (req, res) => {
  const { idlivro } = req.params;
  const q = "SELECT * FROM livros WHERE idlivro = ?";

  db.query(q, [idlivro], (err, results) => {
    if (err) {
      console.error("Erro ao buscar livro:", err);
      return res.status(500).json({ message: "Erro no servidor" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Livro não encontrado" });
    }
    return res.status(200).json(results[0]);
  });
};

