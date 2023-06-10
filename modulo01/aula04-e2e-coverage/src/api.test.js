const { describe, it, after, before } = require('mocha')
const supertest = require('supertest')
const assert = require('assert')

let app;
before((done) => {
    app = require('./api')
    app.once('listening', done)
})

after(done => app.close(done))

describe('API Suite test', () => {
    describe('/contact:get', () => {
        it('should request the contact route and return HTTP Status 200', async () => {
            const response = await supertest(app)
            .get('/contact')
            .expect(200)
            assert.strictEqual(response.text, 'contact us page')
        })
    })

    describe('/login:post', () => {
        it('should request the login and return HTTP Status 200', async () => {
            const response = await supertest(app)
            .post('/login')
            .send({
                    username: "Leonardo",
                    password: "123456"
                }
            )
            .expect(200)
            assert.strictEqual(response.text, 'Log in succeeded!')
        })
    })

    describe('/login:post', () => {
        it('should request the login and return HTTP Status 401', async () => {
            const response = await supertest(app)
            .post('/login')
            .send({
                    username: "Leonardo",
                    password: "1234567"
                }
            )
            .expect(401)
            assert.ok(response.unauthorized)
            assert.strictEqual(response.text, 'Log in failed!')
        })
    })

    describe('/contactt:get', () => {
        it('should request and existing page and return HTTP Status 404', async () => {
            const response = await supertest(app)
            .get('/contactt')
            .expect(404)
            assert.strictEqual(response.text, 'not found!')
        })
    })
})


/*
    Istambul
    npm i -D nyc
*/