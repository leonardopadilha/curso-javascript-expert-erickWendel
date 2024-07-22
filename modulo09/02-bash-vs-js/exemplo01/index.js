const { existsSync, mkdirSync, rmSync } = require('fs')

const makeAndReturnName = (folderName) => {
    if (existsSync(folderName))
}

const FOLDER_AMOUNT = 4
Array.from(Array(FOLDER_AMOUNT).keys()).map(index => console.log(index));