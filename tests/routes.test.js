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
            .get('/movie/search?title=Batman')
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
            .get('/movie/search?title=Batman&page=2')
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
            .get('/movie/search?title=a')
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
            .get('/movie/search?titles=a')
        expect(res.statusCode).toEqual(400)
        expect(res.body).toMatchSchema(errorMovieSchema)
    })
})

describe('Get details movie', () => {
    it('should able to get details movie by valid title', async () => {
        const returnValue = {
            data: {
                Title: "Falsche Liebe",
                Year: "2008",
                Rated: "N/A",
                Released: "N/A",
                Season: "N/A",
                Episode: "N/A",
                Runtime: "1 h 29 min",
                Genre: "Crime",
                Director: "Julian Pölsler",
                Writer: "Katrin Bühlig, Doris Gercke",
                Actors: "Hannelore Hoger, Rudolf Kowalski, Devid Striesow, Peter Simonischek",
                Plot: "N/A",
                Language: "N/A",
                Country: "N/A",
                Awards: "N/A",
                Poster: "https://m.media-amazon.com/images/M/MV5BMTI5MzU2NDA1M15BMl5BanBnXkFtZTcwMTE2MjY4Mw@@._V1_SX300.jpg",
                Ratings: [
                    {
                        Source: "Internet Movie Database",
                        Value: "7.9/10"
                    }
                ],
                Metascore: "N/A",
                imdbRating: "7.9",
                imdbVotes: "22",
                imdbID: "tt1201601",
                seriesID: "N/A",
                Type: "episode",
                Response: "True" 
            }
        }
        
        const detailsMovieSchema = {
            properties: {
                data: {
                    type: "object",
                    properties: {
                        Title: {
                            type: "string"
                        },
                        Year: {
                            type: "string"
                        },
                        Rated: {
                            type: "string"
                        },
                        Released: {
                            type: "string"
                        },
                        Season: {
                            type: "string"
                        },
                        Episode: {
                            type: "string"
                        },
                        Runtime: {
                            type: "string"
                        },
                        Genre: {
                            type: "string"
                        },
                        Director: {
                            type: "string"
                        },
                        Writer: {
                            type: "string"
                        },
                        Actors: {
                            type: "string"
                        },
                        Plot: {
                            type: "string"
                        },
                        Language: {
                            type: "string"
                        },
                        Country: {
                            type: "string"
                        },
                        Awards: {
                            type: "string"
                        },
                        Poster: {
                            type: "string"
                        },
                        Ratings: {
                            type: "array",
                            item: [{
                                type: "object",
                                properties: {
                                    Source: {
                                        type: "string"
                                    },
                                    Value: {
                                        type: "string"
                                    }
                                }
                            }]
                        },
                        Metascore: {
                            type: "string"
                        },
                        imdbRating: {
                            type: "string"
                        },
                        imdbVotes: {
                            type: "string"
                        },
                        imdbID: {
                            type: "string"
                        },
                        seriesID: {
                            type: "string"
                        },
                        Type: {
                            type: "string"
                        },
                        Response: {
                            type: "string"
                        }
                    },
                    required: ['Title', 'Year', 'imdbID']
                }
            },
            required: ['data'],
        };

        const spy = jest
            .spyOn(movieService, 'getMovieDetailsByTitle')
            .mockImplementation(async () => returnValue);

        const res = await request(app)
            .get('/movie/detail?title=Falsche Liebe')
        expect(res.statusCode).toEqual(200)
        expect(res.body).toMatchSchema(detailsMovieSchema)
        expect(spy).toHaveBeenCalledWith("Falsche Liebe");
    })

    it('should able to get details movie by valid id', async () => {
        const returnValue = {
            data: {
                Title: "Falsche Liebe",
                Year: "2008",
                Rated: "N/A",
                Released: "N/A",
                Season: "N/A",
                Episode: "N/A",
                Runtime: "1 h 29 min",
                Genre: "Crime",
                Director: "Julian Pölsler",
                Writer: "Katrin Bühlig, Doris Gercke",
                Actors: "Hannelore Hoger, Rudolf Kowalski, Devid Striesow, Peter Simonischek",
                Plot: "N/A",
                Language: "N/A",
                Country: "N/A",
                Awards: "N/A",
                Poster: "https://m.media-amazon.com/images/M/MV5BMTI5MzU2NDA1M15BMl5BanBnXkFtZTcwMTE2MjY4Mw@@._V1_SX300.jpg",
                Ratings: [
                    {
                        Source: "Internet Movie Database",
                        Value: "7.9/10"
                    }
                ],
                Metascore: "N/A",
                imdbRating: "7.9",
                imdbVotes: "22",
                imdbID: "tt1201601",
                seriesID: "N/A",
                Type: "episode",
                Response: "True" 
            }
        }
        
        const detailsMovieSchema = {
            properties: {
                data: {
                    type: "object",
                    properties: {
                        Title: {
                            type: "string"
                        },
                        Year: {
                            type: "string"
                        },
                        Rated: {
                            type: "string"
                        },
                        Released: {
                            type: "string"
                        },
                        Season: {
                            type: "string"
                        },
                        Episode: {
                            type: "string"
                        },
                        Runtime: {
                            type: "string"
                        },
                        Genre: {
                            type: "string"
                        },
                        Director: {
                            type: "string"
                        },
                        Writer: {
                            type: "string"
                        },
                        Actors: {
                            type: "string"
                        },
                        Plot: {
                            type: "string"
                        },
                        Language: {
                            type: "string"
                        },
                        Country: {
                            type: "string"
                        },
                        Awards: {
                            type: "string"
                        },
                        Poster: {
                            type: "string"
                        },
                        Ratings: {
                            type: "array",
                            item: [{
                                type: "object",
                                properties: {
                                    Source: {
                                        type: "string"
                                    },
                                    Value: {
                                        type: "string"
                                    }
                                }
                            }]
                        },
                        Metascore: {
                            type: "string"
                        },
                        imdbRating: {
                            type: "string"
                        },
                        imdbVotes: {
                            type: "string"
                        },
                        imdbID: {
                            type: "string"
                        },
                        seriesID: {
                            type: "string"
                        },
                        Type: {
                            type: "string"
                        },
                        Response: {
                            type: "string"
                        }
                    },
                    required: ['Title', 'Year', 'imdbID']
                }
            },
            required: ['data'],
        };

        const spy = jest
            .spyOn(movieService, 'getMovieDetailsById')
            .mockImplementation(async () => returnValue);

        const res = await request(app)
            .get('/movie/detail?id=tt1201601')
        expect(res.statusCode).toEqual(200)
        expect(res.body).toMatchSchema(detailsMovieSchema)
        expect(spy).toHaveBeenLastCalledWith("tt1201601");
    })

    it('should able to get error message if get details movie by invalid title', async () => {
        const returnValue = {
            error: "Movie not found!"
        }
        const errorDetailsSchema = {
            properties: {
                error: {
                    type: "string"
                }
            },
            required: ['error'],
        };

        const spy = jest
            .spyOn(movieService, 'getMovieDetailsByTitle')
            .mockImplementation(async () => returnValue);

        const res = await request(app)
            .get('/movie/detail?title=al;sa;d')
        expect(res.statusCode).toEqual(400)
        expect(res.body).toMatchSchema(errorDetailsSchema)
        expect(spy).toHaveBeenCalledWith("al;sa;d");
    })

    it('should able to get error message if get details movie by invalid id', async () => {
        const returnValue = {
            error: "Incorrect IMDb ID."
        }
        const errorDetailsSchema = {
            properties: {
                error: {
                    type: "string"
                }
            },
            required: ['error'],
        };

        const spy = jest
            .spyOn(movieService, 'getMovieDetailsById')
            .mockImplementation(async () => returnValue);

        const res = await request(app)
            .get('/movie/detail?id=1')
        expect(res.statusCode).toEqual(400)
        expect(res.body).toMatchSchema(errorDetailsSchema)
        expect(spy).toHaveBeenCalledWith("1");
    })

    it('should able to get error message if get details movie by invalid query params', async () => {
        const returnValue = {
            error: "Please provide the ID or title of the movie"
        }
        const errorDetailsSchema = {
            properties: {
                error: {
                    type: "string"
                }
            },
            required: ['error'],
        };

        const spy = jest
            .spyOn(movieService, 'getMovieDetailsById')
            .mockImplementation(async () => returnValue);

        const res = await request(app)
            .get('/movie/detail?ids=1')
        expect(res.statusCode).toEqual(400)
        expect(res.body).toMatchSchema(errorDetailsSchema)
    })
})
  