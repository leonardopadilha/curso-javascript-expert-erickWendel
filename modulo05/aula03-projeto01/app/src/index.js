"use strict";

const { readFile } = require('fs/promises')
const { join } = require('path')
const pdf = require('pdf-parse')

;(async () => {
    const dabatBuffer = await readFile(join(__dirname, './../../../docs/contrato.pdf'))
    const data = await pdf(dabatBuffer)
    console.log('data', data.text)
}) ()