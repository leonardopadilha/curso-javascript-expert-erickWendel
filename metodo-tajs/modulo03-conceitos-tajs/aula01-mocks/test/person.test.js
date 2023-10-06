import { describe, it, expect, jest } from '@jest/globals';
import Person from '../src/person.js';

describe('#Person Suite', () => {
    describe('#validate',() => {
        it ('should throw if the name is not present', () => {
            // mock é a entrada necessária para que o teste funcione
            const mockInvalidPerson = {
                name: '',
                cpf: '123.456.789-00'                          
            }

            expect(() => Person.validate(mockInvalidPerson)).toThrow(new Error('name is required'))
        })

        it ('should throw if the cpf is not present', () => {
            // mock é a entrada necessária para que o teste funcione
            const mockInvalidPerson = {
                name: 'Zezin da Silva',
                cpf: ''                          
            }

            expect(() => Person.validate(mockInvalidPerson)).toThrow(new Error('cpf is required'))
        })

        it ('should not throw person is valid', () => {
            // mock é a entrada necessária para que o teste funcione
            const mockInvalidPerson = {
                name: 'Zezin da Silva',
                cpf: '123.456.789-00'                          
            }

            expect(() => Person.validate(mockInvalidPerson)).not.toThrow()
        })
    } )

    describe('$format', () => {
        // parte do princípio que os dados já foram validados
        it('should format the person name and CPF', () => {
            // AAA
         // Arrange - preparação dos dados de entrada (mock) e atribuição das variáveis
         const mockPerson = {
            name: 'Zezin da Silva',
            cpf: '000.999.444-11'
         }


         // Act     - execução do código sob teste
         const formattedPerson = Person.format(mockPerson)

         // Assert  - verificação se o resultado corresponde ao esperado
         const expected = {
            name: 'Zezin',
            cpf: '00099944411',
            lastName: 'da Silva'
         }

         expect(formattedPerson).toStrictEqual(expected)

        })
    })

    describe('#process', () => {
        it ('should process a valid person', () => {
            // uma outra ideia é não retestar o que já foi testado
            // lembrad do checkpoints?
            // Testou do caminho A para o caminho B,
            // agora testa do caminho B ao caminho C
            // Então aqui, eu pulo o caminho A (validate), caminho B (format)
            // e vou direto para o caminho C (save) pois estes caminhos
            // já foram validados

            /**
                Este método abaixo faz mais sentido para quando se tem interações 
                externas como chamadas de API, banco de dados e etc.
             */

            /** Mocks são simulações de funções que se pode fazer ao testar
             o comportamento
             */

             // AAA = Arrange, Act, Assert

             const mockPerson = {
                name: 'Zezin da Silva',
                cpf: '123.456.789-00'
             }

             // Arrange
             jest.spyOn(
                Person,
                Person.validate.name
             ).mockReturnValue()
            /*  .mockImplementation(() => {
                throw new Error('Deu ruim!!')
             }) */

             jest.spyOn(
                Person,
                Person.format.name
             ).mockReturnValue({
                cpf: '12345678900',
                name: 'Zezin',
                lastName: 'da Silva'
             })

             // Act
             const result = Person.process(mockPerson)

             // Assert
             const expected = 'ok';
             expect(result).toStrictEqual(expected)

        })
    })
})