const verificarSenha = (req, res, next) => {
    const { senha } = req.query;
    const senhaCorreta = "cubos123"

    if(!senha || senha !== senhaCorreta){
        return res.status(401).json({"mensagem": "Usuário não autorizado, senha incorreta."})
    }

    next();
};

module.exports = {
    verificarSenha
}
