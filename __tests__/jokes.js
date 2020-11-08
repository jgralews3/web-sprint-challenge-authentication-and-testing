const supertest = require('supertest')
const server = require('../api/server')
const { intersect } = require('../database/dbConfig')
const db = require('../database/dbConfig')

describe('joke tests', () => {
    it('gets jokes', async () => {
        const res1 = await supertest(server).post('/api/auth/login').send({username: "test", password: 'password'})
        const res = await supertest(server).get("/api/jokes").set("Authorization", res1.body.token)
        expect(res.body).toBeDefined()
    })
    it("restricts nonusers", async() =>{
        const res = await supertest(server).get('/api/jokes')
        console.log(res.body)
        expect(res.body.you).toBe('shall not pass!')
    })
})