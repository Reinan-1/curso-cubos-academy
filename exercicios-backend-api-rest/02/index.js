const express = require("express");
const app = express();
const porta = 3000;

const convidados = [
    "Carlos",
    "Amanda",
    "Fernanda",
    "Juliana",
    "Lucas",
    "Roberto",
];

app.use(express.json());

app.get("/convidados", (req, res) => {

    const { nome } = req.query;

    if (!nome) return res.status(200).json(convidados);

    if (convidados.includes(nome)) return res.status(200).json({ "mensagem": "Convidado presente." });
    else return res.status(404).json({ "mensagem": "O convidado buscado não está presente na lista." });


});

app.post("/convidados", (req, res) => {
    const { nome } = req.body;

    if (convidados.includes(nome)) return res.status(400).json({ "mensagem": "O nome do convidado a ser adicionado já existe na lista. Caso queria adicionar outro convidado de mesmo nome, favor fornecer o sobrenome também." })

    convidados.push(nome);
    res.status(201).json({ "mensagem": "Convidado adicionado." })
});

app.delete("/convidados/:nome", (req, res) => {
    const { nome } = req.params;

    if(!convidados.includes(nome)) return res.status(404).json({ "mensagem": "O nome do convidado a ser removido não existe na lista. Nenhum convidado foi removido."});

    const indiceConvidadoRemovido = convidados.indexOf(nome);
    convidados.splice(indiceConvidadoRemovido,1);
    
    res.status(200).json({"mensagem": "Convidado removido."});


});

app.listen(porta);