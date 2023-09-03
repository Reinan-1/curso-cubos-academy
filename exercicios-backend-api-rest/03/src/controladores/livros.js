let { livros } = require("../dados/bancodedados");
let { idLivro } = require("../dados/bancodedados");

const getLivros = (req, res) => {
    res.status(200).json(livros);
};

const getLivroPorId = (req, res) => {
    const { id } = req.params;

    idFormatado = Number(id);

    if (!idFormatado) return res.status(400).json({ "mensagem": "O valor do parâmetro ID da URL não é um número válido." })

    const livroEncontrado = livros.find(livro => livro.id === idFormatado);

    if (!livroEncontrado) return res.status(404).json({ "mensagem": "Não existe livro para o ID informado." })

    res.status(200).json(livroEncontrado);

};

const adicionarLivro = (req, res) => {
    const livro = { id: idLivro++, ...req.body };

    if (!livro.titulo || !livro.autor || !livro.ano || !livro.numPaginas) {
        return res.status(400).json({ "mensagem": "Título, autor, ano e número Paginas, são obrigatórios." });
    }

    livros.push(livro);
    res.status(201).json(livro);

};

const substituirLivro = (req, res) => {
    const { id } = req.params;
    const livro = { ...req.body };

    idFormatado = Number(id);

    if (!idFormatado) return res.status(400).json({ "mensagem": "O valor do parâmetro ID da URL não é um número válido." })

    const livroEncontrado = livros.find(livro => livro.id === idFormatado);

    if (!livroEncontrado) return res.status(404).json({ "mensagem": "Não existe livro a ser substituído para o ID informado." })

    if (!livro.titulo || !livro.autor || !livro.ano || !livro.numPaginas) {
        return res.status(400).json({ "mensagem": "Título, autor, ano e número Paginas, são obrigatórios." });
    }

    const novoLivro = {
        id: livroEncontrado.id,
        ...livro
    }

    livros.splice(idFormatado - 1, 1, novoLivro);

    res.status(200).json({ "mensagem": "Livro substituído." });

};

const alterarLivro = (req, res) => {
    const { id } = req.params;
    const livro = { ...req.body };

    idFormatado = Number(id);

    if (!idFormatado) return res.status(400).json({ "mensagem": "O valor do parâmetro ID da URL não é um número válido." })

    const livroEncontrado = livros.find(livro => livro.id === idFormatado);

    if (!livroEncontrado) return res.status(404).json({ "mensagem": "Não existe livro a ser alterado para o ID informado." })

    const novoLivro = {
        id: livroEncontrado.id,
        ...livroEncontrado,
        ...livro
    }

    livros.splice(idFormatado - 1, 1, novoLivro);

    res.status(200).json({ "mensagem": "Livro alterado." });
};

const deletarLivro = (req, res) => {
    const { id } = req.params;

    idFormatado = Number(id);

    if (!idFormatado) return res.status(400).json({ "mensagem": "O valor do parâmetro ID da URL não é um número válido." })

    const livroEncontrado = livros.find(livro => livro.id === idFormatado);

    if (!livroEncontrado) return res.status(404).json({ "mensagem": "Não existe livro a ser removido para o ID informado." })

    livros = livros.filter(livro => livro.id !== livroEncontrado.id);
    
    res.status(200).json({"mensagem": "Livro removido."});
};

module.exports = {
    getLivros,
    getLivroPorId,
    adicionarLivro,
    substituirLivro,
    alterarLivro,
    deletarLivro
};