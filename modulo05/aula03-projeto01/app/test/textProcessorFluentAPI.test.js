const { describe, it } = require('mocha')
const { expect } = require('chai')
const TextProcessorAPI = require('../src/textProcessorFluentAPI')
const mock = require('./mock/valid')
const TextProcessorFluentAPI = require('../src/textProcessorFluentAPI')

describe('TextProcessorAPI', () => {
    it('build', () => {
        const result = new TextProcessorAPI(mock).build()

        expect(result).to.be.equal(mock)
    })

    it('#extractPeopleData', () => {
        const result = new TextProcessorAPI(mock)
            .extractPeopleData()
            .build()

        const expected = [
            [
                "Xuxa da Silva, brasileira, casada, CPF 235.743.420-12, residente e ",
                "domiciliada a Rua dos bobos, zero, bairro Alphaville, São Paulo. "
            ].join('\n'),
            [
                "Júlia Menezes, brasileira, solteira, CPF 297.947.800-81, residente e ",
                "domiciliada a Av. dos Estados, 99, bairro Jardins, São Paulo. "
            ].join('\n')
        ]

        expect(result).to.be.deep.equal(expected)
    })

    it('#divideTextInColumns', () => {
        const content = [
            [
                "Xuxa da Silva, brasileira, casada, CPF 235.743.420-12, residente e ",
                "domiciliada a Rua dos bobos, zero, bairro Alphaville, São Paulo. "
            ].join('\n')
        ]

        const result = new TextProcessorFluentAPI(content)
                            .divideTextInColumns()
                            .build()

        const expected = [
            [
                "Xuxa da Silva",
                " brasileira",
                " casada",
                " CPF 235.743.420-12",
                " residente e \ndomiciliada a Rua dos bobos",
                " zero",
                " bairro Alphaville",
                " São Paulo. "
            ]
        ]

        expect(result).to.be.deep.equal(expected)
        
    })

    it('#removeEmptyCharacteres', () => {
        const content = [
            [
                "Xuxa da Silva",
                " brasileira",
                " casada",
                " CPF 235.743.420-12",
                " residente e \ndomiciliada a Rua dos bobos",
                " zero",
                " bairro Alphaville",
                " São Paulo. "
            ]
        ]

        const result = new TextProcessorFluentAPI(content)
            .removeEmptyCharacteres()
            .build()

            const expected = [
                [
                    "Xuxa da Silva",
                    "brasileira",
                    "casada",
                    "CPF 235.743.420-12",
                    "residente e domiciliada a Rua dos bobos",
                    "zero",
                    "bairro Alphaville",
                    "São Paulo."
                ]
            ]

        expect(result).to.be.deep.equal(expected)
    })
})  