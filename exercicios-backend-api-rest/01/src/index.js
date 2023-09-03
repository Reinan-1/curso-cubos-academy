const express = require("express");
const roteador = require("./roteador");
const { verificarSenha } = require("./intermediarios");


const app = express();
const porta = 3000;
app.use(express.json());

app.use(verificarSenha);
app.use(roteador);

app.listen(porta);