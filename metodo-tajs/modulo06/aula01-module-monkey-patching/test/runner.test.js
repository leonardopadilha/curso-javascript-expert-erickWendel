import { describe, it, expect } from '@jest/globals'
import { run } from '../src/runner.js';
import lokijs from 'lokijs';

const metaDataLokiInsert = {
    meta: { revision: 0, created: Date.now(), version: 0 },
        '$loki': 1
}

const ID_UUID = '0'
jest.mock('node:crypto', () => ({
    randomUUID: jest.fn(() => ID_UUID)
}))

jest.mock('lockijs')

function configureDbDriverMock(initialData = [{ collection: '', data: [] }]) {
    const spies = {
        db: null,
        addCollection: null,
        insert: null,
        find: null
    }

    spies.db = lokijs.mockImplementationOnce((dbName) => {
        const addCollection = spies.addCollection = jest.fn((collectionName) => {
            const insert = spies.insert

            return {
                insert,
                find
            }
        })
    })

    return spies;
}

describe('Complex Tests', () => {
    it('should spy DB Driver calls', async () => {
        const initialData = [{
            id: '1',
            name: 'Chapolin',
            age: 80,
            power: 'Axe',
            ...metaDataLokiInsert,
        }]

        const seedDb = [{
            collection: 'characteres',
            data: initialData
        }]

        const { spies } = configureDbDriverMock(seedDb)

        await run({
            name: 'Batman',
            power: 'rich',
            age: 50
        })
    })
})