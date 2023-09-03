const express = require("express");
const { getAlunos, getAlunoPorId, cadastrarAluno, deletarAluno } = require("./controladores/alunos");

const roteador = express();

roteador.get("/alunos", getAlunos);
roteador.get("/alunos/:id", getAlunoPorId);
roteador.post("/alunos", cadastrarAluno);
roteador.delete("/alunos/:id", deletarAluno);


module.exports = roteador;