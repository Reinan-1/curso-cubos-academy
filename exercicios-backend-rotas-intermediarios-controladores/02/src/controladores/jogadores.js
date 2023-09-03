const jogadores = require("../bancodedados");

let atual = -1;

const mostrarJogador = (req, res) => {

    atual++;
    if(atual >= jogadores.length) atual = 0;
    res.send(`É a vez de ${jogadores[atual]} jogar!`);
    
};

const remover = (req, res) => {
    const { indice } = req.query;

    if (indice >= jogadores.length || indice < 0) return res.send(`Não existe jogador no índice informado (${indice}) para ser removido.`);

    jogadores.splice(indice, 1);
    res.send(jogadores);

};

function formatarNome(nome) {

    const primeiraLetra = nome[0].toUpperCase();
    const restanteNome = nome.slice(1).toLowerCase();

    const nomeFormatado = primeiraLetra + restanteNome;

    return nomeFormatado
}

const adicionar = (req, res) => {

    const { nome, indice } = req.query;

    if (!nome) return res.send("Informe o nome");

    const nomeFormatado = formatarNome(nome);
    if (!indice) {
        jogadores.push(nomeFormatado);
    } else if (indice >= jogadores.length || indice < 0) {
        return res.send(`O índice informado (${indice}) não existe no array. Novo jogador não foi adicionado.`);
    } else jogadores.splice(indice, 0, nomeFormatado);

    res.send(jogadores);

};


module.exports = remover;

module.exports = {
    mostrarJogador,
    remover,
    adicionar
};