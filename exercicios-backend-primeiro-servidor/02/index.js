const express = require("express");
const app = express();


const cronometro = {
    segundos: 0,
    minutos: 0,
    rodando: false,
    interval: null,

    mostrarTempo: function () {

        const minutosFormatados = String(this.minutos).padStart(2, "0");
        const segundosFormatados = String(this.segundos).padStart(2, "0");

        return `${minutosFormatados} minutos  ${segundosFormatados} segundos`;
    },

    iniciar: function () {
        this.rodando = true;
        this.atualizar();
    },

    pausar: function () {
        this.rodando = false;
    },

    continuar: function () {
        this.rodando = true;
    },

    zerar: function () {
        this.minutos = 0;
        this.segundos = 0;
    },

    atualizar: function () {

        this.interval = setInterval(() => {

            if (this.rodando) {
                
                this.segundos++;

                if (this.segundos > 59) {
                    this.minutos++;
                    this.segundos = 0;
                }

            }

        }, 1000);

    }
}


app.get("/", (requisicao, resposta) => {
    resposta.send(cronometro.mostrarTempo());
});

app.get("/iniciar", (req, res) => {
    cronometro.iniciar();
    res.send("Cronômetro iniciado!");
});

app.get("/zerar", (req, res) => {
    cronometro.zerar();
    res.send("Cronômetro zerado!");
});

app.get("/pausar", (req, res) => {
    
    res.send("Cronômetro pausado!");
    cronometro.pausar();
});

app.get("/continuar", (req, res) => {
    cronometro.continuar();
    res.send("Cronômetro continuando!");
});

app.listen(3000, () => {
    console.log("Servidor Inicializado.");
});


