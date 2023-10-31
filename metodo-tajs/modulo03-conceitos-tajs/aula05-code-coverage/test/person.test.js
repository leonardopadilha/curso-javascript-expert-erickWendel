import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { mapPerson } from '../src/person'; '../src/person.js';

describe('Person Test Suite', () => {
    describe('Happy path', () => {
        it('Should  map person', () => {
            const personStr = '{"name":"erickwendel","age":28}'
            const personObj = mapPerson(personStr)
            expect(personObj).toEqual({
                name: "erickwendel",
                age: 28,
                createdAt: expect.any(Date)
            })
        })
    })

    describe("What coverage doesn't tell you", () => {
        it('Should not map person given invalid JSON String', () => {
            const personStr = '{"name'
            expect(() => mapPerson(personStr))
                .toThrow('Unexpected end of JSON input')
        })

        it('Should  not map given invalid JSON data', () => {
            const personStr = '{}'
            const personObj = mapPerson(personStr)
            expect(personObj).toEqual({
                name: undefined,
                age: undefined,
                createdAt: expect.any(Date)
            })
        })
    })
})