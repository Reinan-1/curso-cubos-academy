const express = require("express");
const {mostrarJogador, remover, adicionar} = require("./controladores/jogadores");

const app = express();
const porta = 3000;


app.get("/", mostrarJogador);
app.get("/remover", remover);
app.get("/adicionar", adicionar);

app.listen(porta, () => { console.log("Rodando"); });