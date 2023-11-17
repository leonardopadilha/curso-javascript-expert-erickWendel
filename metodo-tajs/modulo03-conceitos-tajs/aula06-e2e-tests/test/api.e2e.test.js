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
})