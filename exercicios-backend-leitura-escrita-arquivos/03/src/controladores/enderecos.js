const fs = require("fs/promises");
const { buscarEndereco } = require("utils-playground");

function formatarCep(cep) {
    const primeiraParteCEP = String(cep).slice(0, 5);
    const ultimaParteCEP = String(cep).slice(5);
    const cepFormatado = `${primeiraParteCEP}-${ultimaParteCEP}`;

    return cepFormatado;
}

const consultarCEP = async (req, res) => {
    const { cep } = req.params;

    const cepNumero = Number(cep);
    if (isNaN(cepNumero)) return res.status(400).json({ "mensagem": "CEP sem pontuações." });

    try {
        const enderecos = await fs.readFile("./src/enderecos.json");
        const parseEnderecos = JSON.parse(enderecos);

        const cepFormatado = formatarCep(cep);
        const enderecoEncontrado = parseEnderecos.find(endereco => endereco.cep === cepFormatado);

        if (enderecoEncontrado) return res.status(200).json(enderecoEncontrado);
        else {
            //buscando endereço com a função 
            const endereco = await buscarEndereco(cep);
            //adicionando o endereço no array de endereços
            parseEnderecos.push(endereco);

            //Salvando o array de endereços no arquivo
            await fs.writeFile("./src/enderecos.json", JSON.stringify(parseEnderecos));

            //Mostrando o endereço
            return res.json(endereco);
        }

    } catch (erro) {
        return res.status(404).json({ "mensagem": "Cep não encontrado" });
    }

}

module.exports = {
    consultarCEP
}