const app = require('../app')
const request = require('supertest')
const { sequelize } = require('../models')


afterAll( async () =>{
    sequelize.queryInterface.bulkDelete('Customers', null , {
        restartIdentity: true,
        cascade: true,
        truncate: true
    })
})

const data = {
    email: 'dapow@mail.com',
    password: 'dapow123'
}

describe('Register Checker', () => {
    it('user can register', async() => {
        const response = await request(app).post('/pub/register').send(data)
        expect(response.status).toEqual(201)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message', 'new customer has been created')
    })
    it('not email in register', async() => {
        const response = await request(app).post('/pub/register').send({ password: "dapow123" })
        expect(response.status).toEqual(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message', 'Email required')
    })
    it('not password in register', async() => {
        const response = await request(app).post('/pub/register').send({ email: "dapow@mail.com" })
        expect(response.status).toEqual(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message', 'Password required')
    })
    it('email is empty in register', async() => {
        const response = await request(app).post('/pub/register').send({ email: '', password: "dapow123" })
        expect(response.status).toEqual(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message', 'Email required')
    })
    it('password is empty in register', async() => {
        const response = await request(app).post('/pub/register').send({ email: "dapow@mail.com", password: ''})
        expect(response.status).toEqual(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message', 'Password required')
    })
    it('email already exist in register', async() => {
        const response = await request(app).post('/pub/register').send(data)
        expect(response.status).toEqual(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message', 'Email already exist')
    })
    it('not format email  in register', async() => {
        const response = await request(app).post('/pub/register').send({ email: 'dapow$mail.com', password: "dapow123"})
        expect(response.status).toEqual(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message', 'Invalid email format')
    })
})

describe('Login Checker', () => {
    it('user can login', async() => {
        const response = await request(app).post('/pub/login').send(data)
        expect(response.status).toEqual(200)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("access_token")
    })
    it('wrong password login', async() => {
        const response = await request(app).post('/pub/login').send({email: "dapow@mail.com", password: "dapow16" })
        expect(response.status).toEqual(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message', 'error invalid username or email or password')
    })
    it('wrong email login', async() => {
        const response = await request(app).post('/pub/login').send({email: "cila@mail.com", password: "dapow123" })
        expect(response.status).toEqual(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message', 'error invalid username or email or password')
    })
});