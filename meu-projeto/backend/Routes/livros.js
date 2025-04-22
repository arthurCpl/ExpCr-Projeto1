import express from "express";
import {
  getLivros,
  getLivro,       
  createLivro,
  updateLivro,
  deleteLivro
} from "../Controllers/livros.js";

const router = express.Router();

router.get("/", getLivros);
router.get("/:idlivro", getLivro);     
router.post("/", createLivro);
router.put("/:idlivro", updateLivro);
router.delete("/:idlivro", deleteLivro);

export default router;
