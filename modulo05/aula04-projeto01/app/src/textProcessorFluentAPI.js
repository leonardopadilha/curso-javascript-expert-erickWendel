const { evaluateRegex } = require('./util')
const Person = require('./person')


/*
    O objetivo do Fluent API é executar tarefas como um pipeline, step by step
    e no fim, chama o build. Muito similar ao padrão Builder mas a diferença  que 
    aqui é sobre processos, o Builder é sobre construção de objetos.
*/

class TextProcessorFluentAPI {
    // propriedade privada
    #content
    constructor(content) {
        this.#content = content
    }

    extractPeopleData() { 
        /*
            ?<= Fala que vai extrair os dados que virão depois desse grupo
            
            [contratante|contratado] ou um ou outro, (e tem a flag no fim da expressão pra pegar
            maiúsculo e minúsculo) - gmi

            :\s{1} vai procurar o caracter literal dos dois pontos seguindo de um espaço
            tudo acima fica dentro de um parênteses para falar "vamos pegar daí para frente"

            (?!s) negative look around, vai ignorar os contratantes do fim do 
            documento (que tem só espaço a frente deles)

            .*\n pega qualquer coisa até o primeiro \n

            .*? non greety, esse ? faz com que ele pare na primeira recorrência, assim ele 
            evita ficar em loop

            $ -> informar que a pesquisa acaba no fim da linha
            g -> global
            m -> multiline
            i -> insensitive
        */

        const matchPerson = evaluateRegex(/(?<=[contratante|contratado]:\s{1})(?!\s)(.*\n.*?)$/gmi)

        // faz o match para encontrar a string inteira que contém os dados que 
        //precisamos e retorna um array
        const onlyPerson = this.#content.match(matchPerson)
        this.#content = onlyPerson
        //console.log(onlyPerson)
        return this
    }

    divideTextInColumns() {
        const splitRegex = evaluateRegex(/,/)
        this.#content = this.#content.map(line => line.split(splitRegex))
        return this
    }

    removeEmptyCharacteres() {
        const trimSpaces = evaluateRegex(/^\s+|\s+$|\n/g)
        this.#content = this.#content.map(line => line.map(item => item.replace(trimSpaces, "")))
        return this
    }

    mapPerson() {
        /*
        passa o array de items no construtor de person
        */
        this.#content = this.#content.map(line => new Person(line))
        return this
    }

    build() {
        return this.#content
    }
}

module.exports = TextProcessorFluentAPI