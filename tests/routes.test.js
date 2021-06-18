const request = require('supertest');
const app = require('../app');
const movieService = require('../services/movie');
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
        const returnValue = {
            data: [{
                Title: "Batman Begins",
                Year: "2005",
                imdbID: "tt0372784",
                Type: "movie",
                Poster: "https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
            }],
            count: 1,
            page: 1,
            totalPage: 1
        }
        
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
                },
                count: {
                    type: "number"
                },
                page: {
                    type: "number"
                }
            },
            required: ['data', 'totalPage', 'count', 'page'],
        };

        const spy = jest
            .spyOn(movieService, 'searchMovieByTitle')
            .mockImplementation(async () => returnValue);

        const res = await request(app)
            .get('/movie?title=Batman')
        expect(res.statusCode).toEqual(200)
        expect(res.body).toMatchSchema(searchMovieSchema)
        expect(spy).toHaveBeenCalledWith("Batman", 1);
    })

    it('should able to get movie with valid title and page', async () => {
        const returnValue = {
            data: [{
                Title: "Batman Begins",
                Year: "2005",
                imdbID: "tt0372784",
                Type: "movie",
                Poster: "https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
            }],
            count: 1,
            page: 2,
            totalPage: 2
        }
        
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
                },
                count: {
                    type: "number"
                },
                page: {
                    type: "number"
                }
            },
            required: ['data', 'totalPage', 'count', 'page'],
        };

        const spy = jest
            .spyOn(movieService, 'searchMovieByTitle')
            .mockImplementation(async () => returnValue);

        const res = await request(app)
            .get('/movie?title=Batman&page=2')
        expect(res.statusCode).toEqual(200)
        expect(res.body).toMatchSchema(searchMovieSchema)
        expect(spy).toHaveBeenLastCalledWith("Batman", 2);
    })

    it('should able to get error message if input invalid title', async () => {
        const returnValue = {
            error: "Too much value."
        }
        const errorMovieSchema = {
            properties: {
                error: {
                    type: "string"
                }
            },
            required: ['error'],
        };

        const spy = jest
            .spyOn(movieService, 'searchMovieByTitle')
            .mockImplementation(async () => returnValue);

        const res = await request(app)
            .get('/movie?title=a')
        expect(res.statusCode).toEqual(400)
        expect(res.body).toMatchSchema(errorMovieSchema)
        expect(spy).toHaveBeenCalledWith("a", 1);
    })

    it('should able to get error message if hit endpoint without query title', async () => {
        const returnValue = {
            error: "Input movie title in query"
        }
        const errorMovieSchema = {
            properties: {
                error: {
                    type: "string"
                }
            },
            required: ['error'],
        };

        const spy = jest
            .spyOn(movieService, 'searchMovieByTitle')
            .mockImplementation(async () => returnValue);
            
        const res = await request(app)
            .get('/movie?titles=a')
        expect(res.statusCode).toEqual(400)
        expect(res.body).toMatchSchema(errorMovieSchema)
    })
})
  