'use strict'

const { watch, promises: { readFile } } = require('fs')

class File {
    watch(event, filename) {
        console.log('this', this)
        console.log('arguments', Array.prototype.slice.call(arguments))
        this.showContent(filename)
    }

    async showContent(filename) {
        console.log((await readFile(filename)).toString())
    }
}

/* watch(__filename, async (event, filename) => {
    console.log('index.js!', event, filename)
}) */

const file = new File()
// dessa forma, ele ignora o 'this' da classe File
// herda o this do watch!
//watch(__filename, file.watch)

// alternativa para não herdar o this da função
// mas fica feio!
//watch(__filename, (event, filename) => file.watch(event, filename))

// podemos deixar explícito qual é o contexto que a função deve seguir

// o bind retorna uma função com o 'this' que se mantém de file, ignorando o watch
// sempre que delegar uma função para que outra execute sempre passe o '.bind()' com o contexto
// que se quer que o 'this' seja lá dentro

// watch(__filename, file.watch.bind(file))

/*
    Recaptulando: Precisou utilizar uma função que será executada no futuro, lembre-se sempre de 
    atualizar o contexto this usando a função bind para não ter surpresa.
*/

file.watch.call({ showContent: () => console.log('call: hey sinon!')}, null, __filename)
file.watch.apply({ showContent: () => console.log('call: hey sinon!')}, [null, __filename])


