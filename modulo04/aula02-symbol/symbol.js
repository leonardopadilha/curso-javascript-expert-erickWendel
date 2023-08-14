const assert = require('assert')

// ---- Keys

const uniqueKey = Symbol('userName')
const user = { }

user['userName'] = 'value for normal Objects'
user[uniqueKey] = 'value for symbol'

console.log('getting normal Objects', user.userName)

// sempre único em nível de endereço de memória
/* console.log('getting normal Objects', user[Symbol('userName')])
console.log('getting normal Objects', user[uniqueKey]) */

assert.deepStrictEqual(user.userName, 'value for normal Objects')
assert.deepStrictEqual(user[Symbol("userName")], undefined)
assert.deepStrictEqual(user[uniqueKey], 'value for symbol')

// é difícil de acessar mas não é secreto!
//console.log('symbols', Object.getOwnPropertySymbols(user))

assert.deepStrictEqual(Object.getOwnPropertySymbols(user)[0], uniqueKey)

// byPass - má prática (nem tem no codebase do node)
user[Symbol.for('password')] = 123
assert.deepStrictEqual(user[Symbol.for('password')], 123)
// -- Keys

// Well Known Symbols
const obj = {
    // iterators
    [Symbol.iterator]: () => ({
        items: ['c', 'b', 'a'],
        next() {
            return {
                done: this.items.length === 0,
                // remove o último e retorna
                value: this.items.pop()
            }
        }
    })
}

/* for (const item of obj) {
    console.log(item)
} */

assert.deepStrictEqual([...obj], ['a', 'b', 'c'])

const kItems = Symbol('kItems')
class MyDate {
    constructor(...args) {
        this[kItems] = args.map(arg => new Date(...arg))
    }

    [Symbol.toPrimitive](coercionType) {
        if (coercionType !== 'string') throw new TypeError()

        const items = this[kItems]
                            .map(item => new Intl
                                    .DateTimeFormat("pt-BR", 
                                    {month: "long", day: "2-digit", year: "numeric"})
                                    .format(item)
                            )

        return new Intl.ListFormat("pt-BR", { sytle: "long", type: 'conjunction'}).format(items)
    }

    *[Symbol.iterator]() {
        for (const item of this[kItems]) {
            yield item;
        }
    }

    async *[Symbol.asyncIterator]() {
        const timeout = ms => new Promise(r => setTimeout(r, ms))
        for (const item of this[kItems]) {
            await timeout(100)
            yield item.toISOString()
        }
    }

    get [Symbol.toStringTag]() {
        return  'WHAT?'
    }
}

const myDate = new MyDate(
    [2020, 11, 10],
    [2023, 9, 15]
)

const expectedDates = [
    new Date(2020, 11, 10),
    new Date(2023, 9, 15)
]

// console.log('myDate', myDate)

assert.deepStrictEqual(Object.prototype.toString.call(myDate), '[object WHAT?]')
//console.log('myDate + 1', myDate + 1)
assert.throws(() => myDate + 1, TypeError)

// coerção explícita para chamar o toPrimitive
console.log('String(myDate)', String(myDate))
assert.deepStrictEqual(String(myDate), '10 de dezembro de 2020 e 15 de outubro de 2023')

// implementar o iterator
assert.deepStrictEqual([...myDate], expectedDates)

/* ;(async() => {
    for await(const item of myDate) {
        console.log('asyncIterator', item)
    }
})() */

;(async() => {
    const dates = await Promise.all([...myDate])
    assert.deepStrictEqual(dates, expectedDates)
})

/* ;(async() => {
    const dates = []
    for await(const date of myDate) {dates.push(date)}
    const expectedDatesInlSOString = expectedDates.map(item => item.toISOString())
    assert.deepStrictEqual(dates, expectedDatesInlSOString)
})() */