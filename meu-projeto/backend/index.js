import express from "express";
import livroRoutes from "./Routes/livros.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/livros", livroRoutes);

app.listen(8800, () => {
  console.log("Servidor backend rodando em http://localhost:8800");
});
