const { error } = require('./src/constants')
const File = require('./src/file')
const assert = require('assert')

// IFEE
;(async () => {

    // Variáveis criadas nesse bloco, só são válidas durante a execução
    {
        const filePath = './mocks/emptyFile-invalid.csv'
        const expect = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
        const result = File.csvToJSON(filePath)
        await assert.rejects(result, expect)
    }

    {
        const filePath = './mocks/invalid-header.csv'
        const expect = new Error(error.FILE_FIELDS_ERROR_MESSAGE)
        const result = File.csvToJSON(filePath)
        await assert.rejects(result, expect)
    }

    {
        const filePath = './mocks/fiveItems-invalid.csv'
        const expect = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
        const result = File.csvToJSON(filePath)
        await assert.rejects(result, expect)
    }

    {
        const filePath = './mocks/threeItems-valid.csv'
        const expect = [
            { id: 1, name: 'xuxa da silva', profession: 'developer', age: 120 },
            { id: 2, name: 'jose da silva', profession: 'manager', age: 30 },
            { id: 3, name: 'zezin', profession: 'QA', age: 25 }
        ]

        const result = await File.csvToJSON(filePath)
        await assert.deepEqual(result, expect)
    }

}) ()