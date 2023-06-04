// Fibonacci: O próximo número da sequência é sempre a soma dos anteriores
// input: 3
// 0,1,1
// input: 5
// 0,1,1,2,3

const { createSandbox } = require('sinon');
const Fibonacci = require('./fibonacci');
const sinon = createSandbox();
const assert = require('assert')

;(async() => {

    {
        const fibonacci = new Fibonacci();
        const spy = sinon.spy(
            fibonacci,
            fibonacci.execute.name
        )

        // Número de sequências: 3
        // [0] input: 3, current = 0, next = 1 = resultado 0
        // [1] input: 2, current = 1, next = 1 = resultado 1
        // [2] input: 1, current = 1, next = 2 = resultado 1
        // [3] input: 0, current = 2, next = 3 -> Para 

        for (const sequencia of fibonacci.execute(3)) { 
            //console.log({sequencia})
        }

        const expectedCallCount = 4
        assert.strictEqual(spy.callCount, expectedCallCount)
        //console.log('spy', spy.getCalls())
        /* const { args } = spy.getCall(2)
        const expectParams = [3, 1, 2]
        assert.deepStrictEqual(args, expectParams) */
    }

    {
        const fibonacci = new Fibonacci();
        const spy = sinon.spy(
            fibonacci,
            fibonacci.execute.name
        )

        // Número de sequências: 5
        // [0] input: 5, current = 0, next = 1 = resultado 0
        // [1] input: 4, current = 1, next = 1 = resultado 1
        // [2] input: 3, current = 1, next = 2 = resultado 1
        // [3] input: 2, current = 2, next = 3 = resultado 2
        // [4] input: 1, current = 3, next = 5 = resultado 3
        // [3] input: 0, current = 5, next = 8 -> PARA

        const results = [...fibonacci.execute(5)]
        const expectedCallCount = 6
        assert.strictEqual(spy.callCount, expectedCallCount)
        //console.log('spy', spy.getCalls())
        const { args } = spy.getCall(2)
        const expectParams = [3, 1, 2]
        assert.deepStrictEqual(args, expectParams)

        const expectedResults = [0, 1, 1, 2, 3]
        assert.deepStrictEqual(results, expectedResults)
    }
}) ()