import { describe, it, expect } from '@jest/globals';
import { fetchAPByPage } from '../src/runner';

import page01Fixture from './fixtures/get-page01.json';
import page02Fixture from './fixtures/get-page02.json';

// Como o global.fetch não faz chamadas usando
// o http.request ou http.ClientRequest
// instalamos o axios para fazer requisições

import nock from 'nock'

describe('Web Integation Test Suite', () => {
    it.skip('Should return API without mock', async () => {
        const pag10 = await fetchAPByPage(10);
        expect(pag10[0].id).toStrictEqual(181)
        expect(pag10[0].name).toEqual("Jessica's Friend")
        expect(pag10[0].image).toEqual('https://rickandmortyapi.com/api/character/avatar/181.jpeg')
        //console.log("page10::::::::", pag10[0].id)
    })

    it('Should return the right object with right properties 01', async () => {
        const scope = nock('https://rickandmortyapi.com/api')
                            .get('/character/')
                            .query({ page: 1 })
                            .reply(
                                200,
                                page01Fixture
                        )

        const page01 = await fetchAPByPage();
        expect(page01).toEqual(
            [
                {
                    "id": 1,
                    "name": "Rick Sanchez",
                    "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg"
                }
            ]
        )
        scope.done()
    })
})