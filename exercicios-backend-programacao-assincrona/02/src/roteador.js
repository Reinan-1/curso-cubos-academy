const express = require("express");
const { getPokemons, getPokemon } = require("./controladores/pokemons");

const roteador = express.Router();

roteador.get("/pokemon", getPokemons);
roteador.get("/pokemon/:nome", getPokemon);

module.exports = roteador;