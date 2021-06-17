const axios = require('axios');

async function searchMovieByTitle(title, page = 1){
    try {
        const response = await axios.get(`http://www.omdbapi.com/?apikey=faf7e5bb&s=${title}&page=${page}`);
        if (response.data.Response && response.data.Response == "True") {
            return {
                data: response.data.Search,
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