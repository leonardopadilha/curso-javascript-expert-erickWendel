import { describe, it } from 'node:test'
import { deepStrictEqual, CallTracker } from 'node:assert'
import Controller from '../src/controller.js'
import View from '../src/view.js'

const tracker = new CallTracker();
process.on('exit', () => tracker.verify())

const mockdData = [
    {
        name: 'morty smith',
        image: 'http://',
        age: 30,
        birthDay: new Date()
    },
    {
        name: 'pickle rick',
        image: 'http://',
        age: 30,
        birthDay: new Date()
    }
]

describe('Unit tests for frontend', () => {
    it ('should add a property if name contains smith and remove all other props', () => {
        const expected = [
            {
                name: 'morty smith',
                image: 'http://',
                isBold: true
            },
            {
                name: 'pickle rick',
                image: 'http://',
                isBold: false
            }
        ]

        const controller = new Controller({
            service: {},
            view: {}
        })

        const result = controller.prepareItems(mockdData)
        deepStrictEqual(result, expected)
    })
    it ('should verify either all functions were called properly', async () => {
        
        let htmlResult = ''

        const globalObject = {
            document: {
                querySelector: tracker.calls(() => {
                    return {
                        set innerHTML(value) {
                            htmlResult = value;
                        }
                    }
                })
            }
        }

        globalThis = {
            ...globalThis,
            ...globalObject,
        }

        const service = {
            getCharacters: tracker.calls(() => mockdData)
        }

        const view = new View()
        view.updateTable = tracker.calls(view.updateTable)

        await Controller.initialize({
            service,
            view
        })

        const [{arguments: serviceCall}] = tracker.getCalls(service.getCharacters)
        deepStrictEqual(serviceCall, [{ skip: 0, limit: 5 }])

        const [{arguments: viewCall}] = tracker.getCalls(view.updateTable)
        deepStrictEqual(viewCall, 
            [
                [
                    { isBold: true, name: 'morty smith', image: 'http://' },
                    { isBold: false, name: 'pickle rick', image: 'http://' }
                ]
            ]
        )

        deepStrictEqual(
            htmlResult, 
            '<li><img width=50px src="http://"/><strong>morty smith</strong></li><br><li><img width=50px src="http://"/>pickle rick</li>'
        )

    })
})