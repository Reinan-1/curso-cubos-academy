const express = require("express");
const app = express();


const jogadores = ["José", "Maria", "João", "Marcos", "Fernanda"];

let jogadorAtual = 0;

app.get("/", (requisicao, resposta) => {

    if (jogadorAtual >= jogadores.length) {
        jogadorAtual = 0;
    }

    resposta.send(`É a vez de ${jogadores[jogadorAtual]} jogar!`)

    jogadorAtual++;

});


app.listen(3000);