const PetStore = require('./petStore')
const assert = require('assert')
const BASE_URL = "http://petstore.swagger.io/v2/pet/2";
const { createSandbox } = require('sinon')
const sinon = createSandbox()
const mock = {
    tom: require('../mocks/pet_tom.json')
}

;(async () => {

    /* Acessa a API
    const petStore = new PetStore()
    const dados = await petStore.makeRequest(BASE_URL)
    console.log('dados ', JSON.stringify(dados)) */

    const petStore = new PetStore()
    const stub = sinon.stub(
        petStore,
        petStore.makeRequest.name
    )

    stub
        .withArgs(BASE_URL)
        .resolves(mock.tom)
    
    const expect = {
        type_animal: "dog",
        name: "Tommy",
        status: "available"
    }

    const results = await petStore.getPet(BASE_URL)
    assert.deepEqual(results, expect)

}) ()