const Calculadora = require('./calculadora')
const calculadora = new Calculadora()
const { createSandbox } = require('sinon')
const sinon = createSandbox()
const assert = require('assert')

const spy = sinon.spy(
    calculadora,
    calculadora.multiplicacao.name
)

for (let calc of calculadora.multiplicacao(5, 3, 6)) { }

expectCallCount = 4
assert.strictEqual(spy.callCount, expectCallCount)


