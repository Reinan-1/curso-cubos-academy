const verificarNumeros = (req, res, next) => {
    const {num1, num2} = req.query;

    //Testo se foi escrito um número, senão eu peço para escrever um número
    if(!(num1/num1 === 1)) return res.send("Escreva o número 1");
    if(!(num2/num2 === 1)) return res.send("Escreva o número 2");
    
    next(); 
    
};

module.exports = {
    verificarNumeros
};