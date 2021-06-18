const express = require('express');
const router = express.Router();
const movieServices = require('../services/movie');

router.get('/', async function(req, res, next) {
  try {
    const title = req.query.title;
    const page = req.query.page || 1;
    if (title) {
        const result = await movieServices.searchMovieByTitle(title, page);
        if (result.error) {
            res.status(400);
        } else {
            res.status(200);
        }
        res.json(result);
    } else {
        res.status(400);
        res.json({
            error: "Input movie title in query"
        });
    } 
  } catch (err) {
    console.error(err.message);
    res.status(500);
    res.json({
      error: "Can't retrieve movie list"
    })
  }
});

module.exports = router;