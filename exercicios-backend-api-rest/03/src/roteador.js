const express = require("express");
const { getLivros, getLivroPorId, adicionarLivro, substituirLivro, alterarLivro, deletarLivro } = require("./controladores/livros");
const roteador = express();

roteador.get("/livros", getLivros);
roteador.get("/livros/:id", getLivroPorId);
roteador.post("/livros", adicionarLivro);
roteador.put("/livros/:id", substituirLivro);
roteador.patch("/livros/:id", alterarLivro);
roteador.delete("/livros/:id", deletarLivro);

module.exports = roteador;