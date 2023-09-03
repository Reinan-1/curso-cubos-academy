const express = require("express");
const { getProdutos, getProdutoPorId, calcularFrete } = require("./controladores/produtos");

const roteador = express.Router();

roteador.get("/produtos", getProdutos);
roteador.get("/produtos/:idProduto", getProdutoPorId);
roteador.get("/produtos/:idProduto/frete/:cep", calcularFrete);

module.exports = roteador;