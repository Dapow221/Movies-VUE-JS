const app = require('../app')
const request = require('supertest')
const { sequelize, Customer, Genre, User} = require('../models')
const { signToken } = require('../helpers/helper')


let validToken
const invalidToken = 'jisdbfjlhsvjhvsdzlfyuswefilusdgfdsjvfdjuudysgafjvfjlfvehgvfsdyqtewfgeyaovgcaau'

const data = require('../data/movies.json').map( el=> {
    el.authorId = 1
    el.genreId = 1
    el.createdAt = el.updatedAt = new Date()
    return el
})
const favoriteData = [
    {
        customerId: 1,
        movieId: 1,
        createdAt: "2023-10-06T10:19:21.798Z",
        updatedAt: "2023-10-13T12:01:47.681Z"
    },
    {
        customerId: 1,
        movieId: 2,
        createdAt: "2023-10-06T10:19:21.798Z",
        updatedAt: "2023-10-13T12:01:47.681Z"
    },
    {
        customerId: 2,
        movieId: 3,
        createdAt: "2023-10-06T10:19:21.798Z",
        updatedAt: "2023-10-13T12:01:47.681Z"
    }
]

beforeAll(async()=>{
    const newCus = await Customer.create({ email: 'dapow@mail.com',password: 'dapow123' })
    await Customer.create({email: 'cila@mail.com',password: 'cila123' })
    await User.create({ username: 'cila', email: 'cila@mail.com',password: 'cila123'})
    await Genre.create({ name: 'cila' })  
    await sequelize.queryInterface.bulkInsert('Movies', data, {})
    await sequelize.queryInterface.bulkInsert('Favorites', favoriteData, {})
    validToken = signToken( {id: newCus.id, email:newCus.email }) 
})

afterAll(async()=>{
    await sequelize.queryInterface.bulkDelete('Movies', null, {
        restartIdentity: true,
        cascade: true,
        truncate: true
    })
    await sequelize.queryInterface.bulkDelete('Customers',null,{
        restartIdentity: true,
        cascade: true,
        truncate: true
    })
    await sequelize.queryInterface.bulkDelete('Users',null,{
        restartIdentity: true,
        cascade: true,
        truncate: true
    })
    await sequelize.queryInterface.bulkDelete('Genres',null,{
        restartIdentity: true,
        cascade: true,
        truncate: true
    })
    await sequelize.queryInterface.bulkDelete('Favorites',null,{
        restartIdentity: true,
        cascade: true,
        truncate: true
    })
})

describe('Favorite Checker', () => {
    it('should get favorite data on customer login ', async() => {
        const response = await request(app).get('/pub/favorite').set('access_token', validToken)
        expect(response.status).toEqual(200)
        expect(response.body).toBeInstanceOf(Object)
    })
    it('should add favorite data with user login ', async() => {
        const response = await request(app).post('/pub/favorite/2').set('access_token', validToken)
        expect(response.status).toEqual(201)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message', 'favorite has been added')
    })
    it('fail add favorite when id movies not found in data movies', async() => {
        const response = await request(app).post('/pub/favorite/40').set('access_token', validToken)
        expect(response.status).toEqual(500)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message', 'internal server error')
    })
    it('fail add favorite when not login ', async() => {
        const response = await request(app).post('/pub/favorite/2')
        expect(response.status).toEqual(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message', 'error invalid token')
    })
    it('fail add favorite when token is random ', async() => {
        const response = await request(app).post('/pub/favorite/2').set('access_token', invalidToken)
        expect(response.status).toEqual(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message', 'error invalid token')
    })
    
});
