const { default: expectCt } = require('helmet/dist/middlewares/expect-ct')
const supertest = require('supertest')
const server = require('../api/server')
const { intersect } = require('../database/dbConfig')
const db = require('../database/dbConfig')

beforeEach(async() => {
    await db.seed.run()
})

afterAll(async() => {
    await db.destroy()
})

describe('auth tests', () => {
    it('tests register', async () => {
        const res = await supertest(server).post('/api/auth/register').send({username: "JestTest", password: "test"})
        expect(res.body.username).toBe("JestTest")
    })
    it('tests login fail', async() => {
        const res = await supertest(server).post('/api/auth/login').send({username: "JestTest", password: "test"})
        expect(res.body.message).toBe("Invalid Credentials")
    })
    it('tests login success', async() => {
        const res = await supertest(server).post('/api/auth/login').send({username: "test", password: 'password'})
        expect(res.body.token).toBeDefined()
    })
})