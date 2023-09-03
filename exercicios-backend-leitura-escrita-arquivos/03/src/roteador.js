const express = require("express");
const { consultarCEP } = require("./controladores/enderecos");

const roteador = express.Router();

roteador.get("/enderecos/:cep", consultarCEP);

module.exports = roteador;