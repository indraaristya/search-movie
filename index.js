const express = require('express');
const app = express();
const port = 3000;
const movieController = require('./controller/movie');

app.use('/movie', movieController);

app.get('/', (req, res) => {
  res.json({'message': 'ok'});
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
});