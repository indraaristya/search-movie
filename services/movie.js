const axios = require('axios');
const BASE_URL = process.env.BASE_URL || ''
const API_KEY = process.env.API_KEY || ''

async function searchMovieByTitle(title, page = 1){
    try {
        const response = await axios.get(`${BASE_URL}/?apikey=${API_KEY}&s=${title}&page=${page}`);
        if (response.data.Response && response.data.Response == "True") {
            return {
                data: response.data.Search,
                count: response.data.Search.length,
                page: parseInt(page),
                totalPage: Math.ceil(response.data.totalResults/10)
            }
        } else {
            return {
                error: response.data.Error
            }
        }
    } catch (error) {
        console.log(error);
    }
}

async function getMovieDetailsById(movieId) {
    try {
        const response = await axios.get(`${BASE_URL}/?apikey=${API_KEY}&i=${movieId}`);
        
        if (response.data.Response && response.data.Response == "True") {
            return {
                data: response.data
            }
        }
        return {
            error: response.data.Error || `Error when retrive movie with ID ${movieId}`
        }
    } catch (error) {
        console.log(error);
    }
}

async function getMovieDetailsByTitle(movieTitle) {
    try {
        const response = await axios.get(`${BASE_URL}/?apikey=${API_KEY}&t=${movieTitle}`);
        
        if (response.data.Response && response.data.Response == "True") {
            return {
                data: response.data
            }
        }
        return {
            error: response.data.Error || `Error when retrive movie with title ${movieTitle}`
        }
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    searchMovieByTitle,
    getMovieDetailsById,
    getMovieDetailsByTitle
}