const express = require('express');
const router = express.Router();
const searchData = require('../data/search')

router.get('/show/:id', async (req, res) => {
  let showId = req.params.id;
  const data = await searchData.getId(showId)
  if(data.length == 0){
    return res.status(404).render("posts/error", {error2: "We're sorry, but no results were found for " + showId});
  }
  if(!data.image || !data.image.medium) {
    data.image = {medium: '../public/No-image-found.jpeg'}
  }
  if(!data.language){
    data.language = "N/A"
  }
  if(data.genres.length == 0){
    data.genres = {genres: "N/A"}
  }
  if(!data.rating.average){
    data.rating.average = "N/A"
  }
  if(!data.network || !data.network.name){
    data.network = {name: "N/A"}
  }
  if(!data.summary){
    data.summary = {summary: "N/A"}
  } else {
    data.summary = data.summary.replace(new RegExp('<[^>]*>', 'g'), '')
  }
  res.render("posts/show", {showResults: data})
});

router.get('/', (req,res)=>{
  res.render("posts/index.handlebars")
})

module.exports = router;