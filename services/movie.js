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


module.exports = {
    searchMovieByTitle
}