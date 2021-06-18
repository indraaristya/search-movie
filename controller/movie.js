const express = require('express');
const router = express.Router();
const movieServices = require('../services/movie');

router.get('/', async function(req, res, next) {
  try {
    const title = req.query.title;
    const page = parseInt(req.query.page) || 1;
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

router.get('/detail', async function(req, res) {
  try {
    const id = req.query.id;
    const title = req.query.title;
    let result;
    if (id) {
      result = await movieServices.getMovieDetailsById(id);
    } else if (title) {
      result = await movieServices.getMovieDetailsByTitle(title);
    } else {
      res.status(400);
      return res.send({
          error: "Please provide the ID or title of the movie"
      });
    }

    if (result.error) {
      res.status(400);
    } else {
      res.status(200);
    }
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500);
    res.json({
      error: "Can't retrieve movie details"
    })
  }
});

module.exports = router;