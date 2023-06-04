class Fibonacci {
    * execute(input, current = 0, next = 1) {
    // processou todas as sequências e para   
    if (input === 0 ) {
            return
        }

        // retorna o valor
        yield current

        // delega a função mas não retorna valor!
        //console.log("antes: ", input - 1, next, current + next)
        yield * this.execute(input - 1, next, current + next)
        //console.log("depois: ", input - 1, next, current + next)
    }
}

module.exports = Fibonacci