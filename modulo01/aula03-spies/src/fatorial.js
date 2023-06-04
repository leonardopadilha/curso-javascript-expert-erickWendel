class Fatorial {
    fatorial(n) {
        let fat = 1

        for (let num = n; num > 1; num--) {
            fat *= num
        }
        return fat
    }
}

module.exports = Fatorial

