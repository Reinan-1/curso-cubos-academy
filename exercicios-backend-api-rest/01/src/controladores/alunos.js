let { alunos } = require("../dados/bancodedados");
let { idAluno } = require("../dados/bancodedados");

const getAlunos = (req, res) => {
    res.status(200).json(alunos);
};

const getAlunoPorId = (req, res) => {
    const { id } = req.params;

    const idFormatado = Number(id);
    if (typeof (idFormatado) !== "number") {
        return res.status(400).json({ "mensagem": "O ID deve ser um número válido." });
    }

    const alunoEncontrado = alunos.find(aluno => aluno.id === idFormatado);

    if (!alunoEncontrado) return res.status(404).json({ "mensagem": "Aluno não encontrado." });

    res.status(200).json(alunoEncontrado);

};


const cadastrarAluno = (req, res) => {
    const aluno = {id: idAluno++, ...req.body};
    const {nome,sobrenome,idade, curso} = aluno;

    if(!nome || !sobrenome || !idade || !curso) return res.status(400).json({"mensagem": "Nome, sobrenome, idade e curso, são obrigatórios."});

    if(nome.trim() === "" || sobrenome.trim() === "" || curso.trim() === "") return res.status(400).json({"mensagem": "Nome, sobrenome e curso, precisam ser informados."});

    if(Number(idade) < 18) return res.status(400).json({"mensagem": "O aluno precisa ser maior de idade."});

    alunos.push(aluno);
    res.status(201).send();
};

const deletarAluno = (req, res) => {
    const { id } = req.params;

    const idFormatado = Number(id);
    if (typeof (idFormatado) !== "number") {
        return res.status(400).json({ "mensagem": "O ID deve ser um número válido." });
    }

    const alunoEncontrado = alunos.find(aluno => aluno.id === idFormatado);

    if (!alunoEncontrado) return res.status(404).json({ "mensagem": "Aluno a ser excluído não foi encontrado." });

    alunos = alunos.filter((aluno => aluno.id !== idFormatado));

    res.status(200).json(alunoEncontrado);

};

module.exports = {
    getAlunos,
    getAlunoPorId,
    cadastrarAluno,
    deletarAluno
};