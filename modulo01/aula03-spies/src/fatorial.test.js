const Fatorial = require('./fatorial')
const assert = require('assert')

{
    const fatorial = new Fatorial()
    const resultFatorial = fatorial.fatorial(5)

    const expectCount = 120
    assert.strictEqual(resultFatorial, expectCount)
}