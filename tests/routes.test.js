const request = require('supertest');
const app = require('../app');
const { matchers } = require('jest-json-schema');
expect.extend(matchers);;

describe('Home page', () => {
    it('should able to hit the API', async () => {
        const res = await request(app)
            .get('/')
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('message')
    })
})

describe('Search movie', () => {
    it('should able to get movie with valid title', async () => {
        const searchMovieSchema = {
            properties: {
                data: {
                    type: "array",
                    items: [{
                        type: "object",
                        properties: {
                            Title: {
                                type: "string"
                            },
                            Year: {
                                type: "string",
                            },
                            imdbID: {
                                type: "string"
                            },
                            Type: {
                                type: "string",
                            },
                            Poster: {
                                type: "string"
                            }
                        },
                        required: ["Title", "Year", "imdbID", "Type", "Poster"]
                    }]
                },
                totalPage: {
                    type: "number"
                }
            },
            required: ['data', 'totalPage'],
        };
        const res = await request(app)
            .get('/movie?title=Batman')
        expect(res.statusCode).toEqual(200)
        expect(res.body).toMatchSchema(searchMovieSchema)
    })

    it('should able to get error message if input invalid title', async () => {
        const errorMovieSchema = {
            properties: {
                error: {
                    type: "string"
                }
            },
            required: ['error'],
        };
        const res = await request(app)
            .get('/movie?title=a')
        expect(res.statusCode).toEqual(400)
        expect(res.body).toMatchSchema(errorMovieSchema)
    })
})
  