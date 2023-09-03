const express = require("express");
const { verificarNumeros } = require("./intermediarios");
const {somar, subtrair, multiplicar, dividir} = require("./controladores/operacoes");


const app = express();
const porta = 3000;

app.use(verificarNumeros);

app.get("/somar", somar);
app.get("/subtrair", subtrair);
app.get("/multiplicar", multiplicar);
app.get("/dividir", dividir);



app.listen(porta, () => {console.log("Rodando");});