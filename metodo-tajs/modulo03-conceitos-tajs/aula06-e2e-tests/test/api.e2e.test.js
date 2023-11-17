import {  describe, it, expect, jest, beforeAll, afterAll } from '@jest/globals';
import Person from '../src/person.js'

function waitForServerStatus(server) {
    return new Promise((resolve, reject) => {
        server.once('error', (err) => reject(err))
        server.once('listening', () => resolve())
    })
}

describe('E2E Test Suite', () => {
    describe('E2E Tests for Server in a non-test env', () => {
        it('should start server with PORT 4000', async () => {
            const PORT = 4000
            process.env.NODE_ENV = 'production'
            process.env.PORT = PORT

            jest
                .spyOn(
                    console,
                    console.log.name
                )

                const { default: server } = await import('../src/index.js')
                await waitForServerStatus(server)
    
                const serverInfo = server.address()
                expect(serverInfo.port).toBe(4000)
                expect(console.log).toHaveBeenCalledWith(
                    `server is running at ${serverInfo.address}:${serverInfo.port}`
                )

                return new Promise(resolve => server.close(resolve))
        })
    })

    describe('E2E Tests for Server', () => {
        let _testServer;
        let _testServerAddress;

        beforeAll(async () => {
            process.env.NODE_ENV = 'test'
            const { default: server } = await import('../src/index.js')
            _testServer = server.listen();

            await waitForServerStatus(_testServer)

            const serverInfo = _testServer.address()
            _testServerAddress = `http://localhost:${serverInfo.port}`
        })

        afterAll(done => _testServer.close(done))

        it('should return 404 for unsupported routes', async () => {
            const response = await fetch(`${_testServerAddress}/unsupported`, {
                method: 'POST'
            })
            expect(response.status).toBe(404)
        })

        it('should return 404 unsupported method', async () => {
            const response = await fetch(`${_testServerAddress}/persons`, {
                method: 'PUT'
            })
            expect(response.status).toBe(404)
        })

        it('should return 400 and missing field message when body is invalid', 
        async () => {
            const invalidPerson = { name: 'Fulano da Silva'} // Missing CPF

            const response = await fetch(`${_testServerAddress}/persons`, {
                method: 'POST',
                body: JSON.stringify(invalidPerson)
            })
            expect(response.status).toBe(400)
            const data = await response.json()
            expect(data.validationError).toEqual('cpf is required')
        })

        it('should return 400 and missing field message when body withoud name', 
        async () => {
            const invalidPerson = { cpf: '123.456.789-00'} // Missing Name
            const response = await fetch(`${_testServerAddress}/persons`, {
                method: 'POST',
                body: JSON.stringify(invalidPerson)
            })
            expect(response.status).toBe(400)
            const data = await response.json()
            expect(data.validationError).toEqual('name is required')
        })
    })

    describe('Register e2e', () => {
        let _testServer;
        let _testSeverAddress;

        beforeAll(async () => {
            process.env.NODE_ENV = 'test'
            const { default: server } = await import('../src/index.js')
            _testServer = server.listen();

            const serverInfo = _testServer.address()
            _testSeverAddress = `http://localhost:${serverInfo.port}`
        })

        afterAll(done => _testServer.close(done))

        it('should return 200 for register with success', async () => {
            const validPerson = {"name": "Xuxa da Silva","cpf": "12312312312"}

            const response = await fetch(`${_testSeverAddress}/persons`, {
                method: 'POST',
                body: JSON.stringify(validPerson)
            })
            expect(response.status).toBe(200)
            const data = await response.json()
            expect(data.result).toEqual('ok')
        })

        it('should return 500 for register', async () => {
            const invalidPerson = { "cpf": '12312312312', "name": 'Xuxa'}

            const response = await fetch(`${_testSeverAddress}/persons`, {
                method: 'POST',
                body: JSON.stringify(invalidPerson)
            })

            expect(response.status).toBe(500)
            let message =  "Cannot save invalid person: {\"cpf\":\"12312312312\",\"name\":\"Xuxa\"}"
            expect(() => Person.save(invalidPerson)).toThrow(new Error(message))
        })
    })
})