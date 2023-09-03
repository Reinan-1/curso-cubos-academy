const produtos = require("../bancodedados/produtos");
const { getStateFromZipcode } = require("utils-playground");

const getProdutos = (req, res) => {

    res.json(produtos);
};

const getProdutoPorId = (req, res) => {
    const { idProduto } = req.params;

    const idFormatado = Number(idProduto);
    if (isNaN(idFormatado)) {
        return res.status(400).json({ "mensagem": "ID precisa ser um número válido." });
    }

    const produtoEncontrado = produtos.find(produto => produto.id === idFormatado);
    if (!produtoEncontrado) return res.status(404).json({ "mensagem": "Não existe produto com o ID informado." });

    res.json(produtoEncontrado);

};

const calcularFrete = async (req, res) => {
    const { idProduto, cep } = req.params;

    const idFormatado = Number(idProduto);
    if (isNaN(idFormatado)) {
        return res.status(400).json({ "mensagem": "ID precisa ser um número válido." });
    }

    let cepFormatado = Number(cep);
    if (isNaN(cepFormatado)) {
        return res.status(400).json({ "mensagem": "CEP sem pontuação." });
    }

    const produtoEncontrado = produtos.find(produto => produto.id === idFormatado);
    if (!produtoEncontrado) return res.status(404).json({ "mensagem": "Não existe produto com o ID informado." });

    try {
        const uf = await getStateFromZipcode(cep);
        let totalPagar = 0;

        if (uf === "BA" || uf === "SE" || uf === "AL" || uf === "PE" || uf === "PB") {
            totalPagar = produtoEncontrado.valor * 0.10;
        }
        else if (uf === "SP" || uf === "RJ") {
            totalPagar = produtoEncontrado.valor * 0.15;
        }
        else {
            totalPagar = produtoEncontrado.valor * 0.12;
        }

        const produtoCustoFrete = {
            "produto": { ...produtoEncontrado },
            "estado": uf,
            "frete": totalPagar
        }

        res.json(produtoCustoFrete);
    } catch (error) {
        return res.status(400).json(`Erro: ${error.message}`);
    }


};

module.exports = {
    getProdutos,
    getProdutoPorId,
    calcularFrete
}