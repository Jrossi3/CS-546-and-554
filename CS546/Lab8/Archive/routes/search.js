const express = require('express');
const router = express.Router();
const searchData = require('../data/search')

router.post('/', async (req, res) => {
  let showSearchTerm = req.body.showSearchTerm;
  if (!showSearchTerm) {
    return res.status(400).render("posts/error", {error: "Empty search box"})
  }
  const data = await searchData.getSearchTerm(showSearchTerm)
  if(data.length == 0){
    return res.status(404).render("posts/error", {error1: "We're sorry, but no results were found for " + showSearchTerm})
  }
  res.render("posts/search", {searchShowResult: data, showSearchTerm})
});

module.exports = router;