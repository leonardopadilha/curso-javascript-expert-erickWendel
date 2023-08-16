const assert = require('assert')

// usado na maioria das vezes para listas de itens únicos

const arr1 = ["0", "1", "2"]
const arr2 = ["2", "0", "3"]
const arr3 = arr1.concat(arr2)
//console.log(arr3.sort()) // O sort ordena a lista
assert.deepStrictEqual(arr3.sort(), [ '0', '0', '1', '2', '2', '3' ])

const set = new Set()
arr1.map(item => set.add(item))
arr2.map(item => set.add(item))

//console.log('Set with add item per item', set)
assert.deepStrictEqual(Array.from(set), ['0', '1', '2', '3' ])

// rest/spread
assert.deepStrictEqual(Array.from(new Set([...arr1, ...arr2])), ['0', '1', '2', '3' ])

//console.log('set.keys', set.keys())
//console.log('set.values', set.values()) // só existe por conta do Map

// no Array comum, para saber se um item existe
// [].indexOf('1') !== -1 ou [0].includes(0)
assert.ok(set.has('3'))

// mesma teoria do Map, mas você sempre trabalha com a lista toda
// não tem get, então você pode saber se o item está ou não no Array e é isso.
// na documentação tem exemplos sobre como fazer uma interceção, saber 
// o que tem em uma lista e não tem na outra e assim por diante

// tem nos dois arrays
const user01 = new Set([
    'Erick',
    'Mariazinha',
    'Xuxa da Silva'
])

const user02 = new Set([
    'Joãozinho',
    'Erick',
    'Julio'
])

const intersection = new Set([...user01].filter(user => user02.has(user)))
console.log(intersection)
assert.deepStrictEqual(Array.from(intersection), ['Erick'])

const difference = new Set([...user01].filter(user => !user02.has(user)))
console.log(difference)
assert.deepStrictEqual(Array.from(difference), ['Mariazinha', 'Xuxa da Silva'])

// weakSet
// mesma ideia do WeakMap
// não é enumerável (iterável)
// só trabalha com chaves com referencia
// só tem métodos simples

const user = { id: 123 }
const user2 = { id: 321 }

const weakSet = new WeakSet([ user ])
weakSet.add(user02)
weakSet.delete(user)
weakSet.has(user)