const app = require('../app')
const request = require('supertest')
const { sequelize, Customer, Genre, User } = require('../models')

const data = require('../data/movies.json').map(el => {
    el.authorId = 1
    el.genreId = 1
    el.createdAt = el.updatedAt = new Date()
    return el
})

beforeAll(async()=>{
    await Customer.create({ email: 'dapow@mail.com',password: 'dapow123' })
    await User.create({ username: 'cila', email: 'cila@mail.com',password: 'cila123'})
    await Genre.create({ name: 'cilacantik' })  
    await sequelize.queryInterface.bulkInsert('Movies', data, {})
})

afterAll(async()=>{
    await sequelize.queryInterface.bulkDelete('Movies', null, {
        restartIdentity: true,
        cascade: true,
        truncate: true
    })
    await sequelize.queryInterface.bulkDelete('Customers', null, {
        restartIdentity: true,
        cascade: true,
        truncate: true
    })
    await sequelize.queryInterface.bulkDelete('Users', null, {
        restartIdentity: true,
        cascade: true,
        truncate: true
    })
    await sequelize.queryInterface.bulkDelete('Genres', null, {
        restartIdentity: true,
        cascade: true,
        truncate: true
    })
})

describe('Movie Checker', () => {
    it('should get all data movies ', async() => {
        const response = await request(app).get('/pub/movies')
        expect(response.status).toEqual(200)
        expect(response.body).toBeInstanceOf(Object)
    })
    it('should get all data movies with query filter paramater ', async() => {
        const response = await request(app).get('/pub/movies?filter=2')
        expect(response.status).toEqual(200)
        expect(response.body).toBeInstanceOf(Object)
    })
    it('get one data movies with params id 69', async() => {
        const response = await request(app).get('/pub/movies/69')
        expect(response.status).toEqual(500)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message', 'internal server error')
    })
});
