const { evaluateRegex } = require('./util')

class Person {
    // (\w+):\s.*
    // $this.1 = 1

    constructor(
        [
            nome,
            nacionalidade,
            estadoCivil,
            documento,
            rua,
            numero,
            bairro,
            estado,
        ]) {
            
            /*
            ^ -> começo da string
            * -> um ou mais ocorrências
            (\w{1}) -> pega só a primeira letra e deixa em um grupo
            (a-zA-Z) encontra letras maúsculas ou minúsculas, adicionamos o + pra ele pegar todas até o caracter especial
            g -> todas as ocorrências que encontrar
            */
            const firstLetterExp = evaluateRegex(/^(\w{1})([a-zA-Z]+$)/)
            const formatFirstLetter = (prop) => {
                return prop.replace(firstLetterExp, (fullMatch, group1, group2, index) => {
                    return `${group1.toUpperCase()}${group2.toLowerCase()}`
                })
            }

            //(\w+),
            //this.$1 = $1

            this.nome = nome
            this.nacionalidade = formatFirstLetter(nacionalidade)
            this.estadoCivil = formatFirstLetter(estadoCivil)
            /*
            tudo o que não for dígito vira vazio
            /g serve para remover todas as ocorrências que encontrar
            */
            this.documento = documento.replace(evaluateRegex(/\D/g), "")

            /*
            começa a procurar depois do " a " e pega tudo que tem a frente
            (?<= faz com que ignore tudo que tiver antes desse match)
            conhecido como positive lookBehind
            */
            this.rua = rua.match(evaluateRegex(/(?<=\sa\s).*$/)).join()
            this.numero = numero

            /*
            começa a buscar depois do espaço, pega qualquer letra ou dígito até o fim
            da linha (poderia ser o .* também)
            */
            this.bairro = bairro.match(evaluateRegex(/(?<=\s)\w+$/)).join()

            /*
            remove o ponto liteal {.} do fim da frasse
            */
            this.estado = estado.replace(evaluateRegex(/\.$/), "")

    }
}

module.exports = Person;