## Movie API

##### Description
This API will help you to get to know about the details of specific movie or may be you forgot the title of the movie, you can look for it too using this API. Basically, this API provide 2 endpoint which are the function is for search the movies by title and also give the details of the movie by title or imdbId.

#### How to run locally 
In case you are curious can we run the services in our device, the answer is yes. Please remember to make sure you already has Node installed in your device also you have MySQL databases. 
First, pull this repository in `master` branch. You can download it or pull by ssh/https. Once you've done, go to the service directory in terminal/cmd and run the dependency using this command
```
npm i
```
It will install the dependency which defined in `package.js` file. And yep, you can run it anyway.
Don't forget to create the `.env` file with specific variables name (see `.env.example`).
```
source .env
```
Run those command after you create the environment file, and the service is ready to up.
```
npm start
```
In case you are wondering how's the test is going, you can check it by run this command.
```
npm test
```

#### Endpoint method
These 2 endpoint has specific parameters and will give you the result based on it.
##### Search movie by title
For searching a movie by the title, we need to pass the title using query parameters in the endpoint.
```
GET /movie/search?title=<the title of the movie>&page=<number of pagination>
```

##### Get movie details by title
Same with searching endpoint, we need to pass the title in parameters to get the details of the movie.
```
GET /movie/detail?title=<the title of the movie>
```

##### Get movie details by imdb ID
If you don't know the specific and correct movie title, may be you can pass the IMDB ID to get the details.
```
GET /movie/detail?id=<the id of the movie>
```

###### The documentation of API endpoint can be found [in this Apiary document](https://ndrmovieapi.docs.apiary.io).
