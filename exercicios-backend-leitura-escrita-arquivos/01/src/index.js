const express = require("express");
const roteador = require("./roteador");

const app = express();
const porta = 3000;

app.use(express.json());
app.use(roteador);

app.listen(porta, () => { console.log("rodando."); })