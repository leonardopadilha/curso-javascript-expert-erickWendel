const assert = require('assert')
const myMap = new Map();

// podem ter qualquer coisa como chave

myMap
    .set(1, 'one')
    .set('Erick', { text: 'two'})
    .set(true, () => 'hello')

// usando um construtor
const myMapWithConstructor = new Map([
    ['1', 'strl'],
    [1, 'num1'],
    [true, 'bol1']
])

//console.log('myMap', myMap)
//console.log('myMap.get(1)', myMap.get(1))
assert.deepStrictEqual(myMap.get(1), 'one')
assert.deepStrictEqual(myMap.get('Erick'), { text: 'two'})
assert.deepStrictEqual(myMap.get(true)(), 'hello')


// Em Objects a chave só pode ser string ou symbol (number é coergido a string)
const obj = { id: 1 }
myMap.set(obj, { name: 'ErickWendel'}) // Adicionando nova key
console.log('get', myMap.get({id: 1})) // retornou undefined

const onlyReferenceWorks = { id: 1 }
myMap.set(onlyReferenceWorks, { name: 'ErickWendell'})  // Adicionando nova key
console.log('get', myMap.get(onlyReferenceWorks)) // get { name: 'ErickWendel' }
assert.deepStrictEqual(myMap.get({ id: 1 }), undefined)
assert.deepStrictEqual(myMap.get(onlyReferenceWorks), { name: 'ErickWendell' })

// utilitários
// No Object seria Object.keys({ a: 1 }).length
assert.deepStrictEqual(myMap.size, 5)
//console.log(myMap)

// para verificar se um item existe no objeto
// item.key = se não existe = undefined
// if() = coerção implícita para boolean e retorna false
// O jeito certo em Object é ({ name: 'Erick' }).hasOwnProperty('name')

assert.ok(myMap.has(onlyReferenceWorks))

// para remover um item do objeto
// delete item.id
// imperformático para o Javascript
assert.ok(myMap.delete(onlyReferenceWorks))

// Não dá pra iterar em Objects diretamente
// tem que transformar com o Object.entries(item)
//assert.deepStrictEqual([...myMap], null)
//assert.deepStrictEqual(JSON.stringify([...myMap]), null)
assert.deepStrictEqual(JSON.stringify([...myMap]), 
                       JSON.stringify([[1,"one"],["Erick",{"text":"two"}],[true, () => {}],[{"id":1},{"name":"ErickWendel"}]]))

for (const [key, value] of myMap) {
    console.log({ key, value })
}

// Object é inseguro, pois dependendo do nome da chave, pode substituir algum comportamento padrão
// ({ }).toString() === '[object Object]'
// ({toString: () => 'Hey }).toString() === 'Hey'

// qualquer chave pode colidir, com as propriedades herdadas do objecto, como
// constructor, toString, valueOf e etc.

const actor = {
    name: 'Xuxa da Silva',
    toString: 'Queen: Xuxa da Silva'
}

// não tem restrição de nome de chave
myMap.set(actor)
//assert.deepStrictEqual(myMap.has(actor), null)
//assert.ok(myMap.has(actor))
assert.throws(() => myMap.get(actor).toString, TypeError)

// Não dá para limpar um Obj sem reassiná-lo
myMap.clear()
assert.deepStrictEqual([...myMap.keys()], [])

// --- WeakMap
// Pode ser coletado após perder as referências
// usado em casos beem específicos

// tem a maioria dos benefícios do Map
// MAS: não é iterável
// Só chaves de referência e que você já conheça
// mais leve e preve leak de memória, pq depois que as instâncias saem da memória, tudo é limpo

const weakMap = new WeakMap()
const hero = { name: 'Flash' }

weakMap.set(hero)
weakMap.get(hero)
weakMap.delete(hero)
weakMap.has(hero)
