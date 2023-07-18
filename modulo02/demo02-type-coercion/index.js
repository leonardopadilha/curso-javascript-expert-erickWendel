// 9999999999999999 (16) => 1000000000000000
// true + 2 => 3
// '21' + true => '21true'
// '21' - true => 20


// ---------------------

console.assert(String(123) === "123", "explicit convertion to string")
console.assert(123 + '' === "123", "implicit convertion to string")

console.assert(('hello' || 123) === 'hello', '|| retorna sempre o primeiro se os dois forem true')
console.assert(('hello' && 123) === 123, '&& returns the last element!')

// ---------------------

const item = {
    name: 'ErickWendl',
    age: 25,
    toString() {
        return `Name ${this.name}, Age: ${this.age}`
    }
}

/*
    string: 1 se não for primitivo, chama o valueOf (toString)
    numer: 1 se não for primitivo, chama o toString (valueOf)
*/

console.log('item', item + 0)