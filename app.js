const express = require('express');
const app = express();
const movieController = require('./controller/movie');

app.use('/movie', movieController);

app.get('/', (req, res) => {
  res.json({'message': 'ok'});
})

module.exports = app;