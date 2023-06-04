class Calculadora {
    * multiplicacao(num, inicio = 1, fim = 10) {
        if (inicio >= fim) {
            return
        } 

        yield num * inicio

        yield * this.multiplicacao(num, inicio + 1, fim)
    }
}

module.exports = Calculadora