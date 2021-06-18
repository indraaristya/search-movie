const express = require('express');
const app = express();
const movieController = require('./controller/movie');
const db = require('./services/db-setup');
const { uuid } = require('uuidv4');

app.use((req, res, next) => {
  const datetime = new Date();
  res.on('finish', async () => {
    const url = req.originalUrl.split("?")
    const result = await db.query(
      `INSERT INTO apiLog (id, method, endpoint, params, hitAt, statusCode) VALUES (?, ?, ?, ?, ?, ?)`,
      [ uuid(), req.method, url[0], url[1] || null, datetime, res.statusCode ]
    )
  })
  next()
});


app.use('/movie', movieController);

app.get('/', (req, res) => {
  res.json({'message': 'ok'});
})

module.exports = app;