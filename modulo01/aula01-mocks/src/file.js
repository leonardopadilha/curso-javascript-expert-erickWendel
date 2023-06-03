const { readFile } = require('fs/promises')
const { error } = require('./constants')
const DEFAULT_OPTION = {
    maxLines: 3,
    fields: ['id', 'name', 'profession', 'age']
}

class File {
    static async csvToJSON(filePath) {
        const content = await readFile(filePath, "utf-8")
        const validation = this.isValid(content)
        if (!validation.valid) throw new Error(validation.error)

        const result = this.parseCSVToJSON(content)
        return result
    }

    static isValid(csvString, options = DEFAULT_OPTION) {
        // para ver o conteúdo do arquivo
        // fs.readFileSync('../mocks/threeItems-valid.csv', 'utf-8')

        // [0] = headers
        // [1] = linha 1
        // [2] = linha 2
        // ...variável = restante do arquivo
        const [headers, ...fileWithoutHeader] = csvString.split(/\r?\n/)
        const isHeaderValid = headers === options.fields.join(',')
        if (!isHeaderValid) {
            return {
                error: error.FILE_FIELDS_ERROR_MESSAGE,
                valid: false
            }
        }

        if (!fileWithoutHeader.length || fileWithoutHeader.length > options.maxLines) {
            return {
                error: error.FILE_LENGTH_ERROR_MESSAGE,
                valid: false
            }
        }
        return { valid: true }
    }

    static parseCSVToJSON(csvString) {
        const lines = csvString.split(/\r?\n/)

        // remover a primeira linha (header)
        const firstLine = lines.shift()
        const header = firstLine.split(',')

        const users = lines.map(line => {
            const columns = line.split(',')
            const user = {}
            for (let index in columns) {
                user[header[index]] = columns[index].trim()

                /*
                const key = headers[index];
                const value = columns[index].trim;
                user[key] = value;
                */
            }
            return user;
        })

        return users
    }
}

module.exports = File