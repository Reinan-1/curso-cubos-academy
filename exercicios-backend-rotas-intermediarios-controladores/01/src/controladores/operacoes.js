
function extrairReq(req) {
    let { num1, num2 } = req.query;

    num1 = Number(num1);
    num2 = Number(num2);

    return [num1, num2]
}

const somar = (req, res) => {

    const [num1, num2] = extrairReq(req);

    const resultado = num1 + num2;

    res.send(resultado.toString());

};

const subtrair = (req, res) => {

    const [num1, num2] = extrairReq(req);

    const resultado = num1 - num2;

    res.send(resultado.toString());

};

const dividir = (req, res) => {

    const [num1, num2] = extrairReq(req);

    const resultado = num1 / num2;

    res.send(resultado.toString());

};

function multiplicar(req, res) {

    const [num1, num2] = extrairReq(req);

    const resultado = num1 * num2;

    res.send(resultado.toString());

}

module.exports = {
    somar,
    subtrair,
    dividir,
    multiplicar
};