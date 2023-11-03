"use strict";

const { readFile } = require('fs/promises')
const { join } = require('path')
const pdf = require('pdf-parse')

const TextProcessorFacade = require('./textProcessorFacade')

;(async () => {
    const dabatBuffer = await readFile(join(__dirname, './../../../docs/contrato.pdf'))
    const data = await pdf(dabatBuffer)
    //console.log('data', data.text)

    const instance = new TextProcessorFacade(data.text)
    const people = instance.getPeopleFromPDF()
    console.log('people', people)
}) ()