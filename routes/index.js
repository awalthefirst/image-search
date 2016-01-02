var express = require('express');
var router = express.Router();
var request = require("request");
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'image-search'
  });



});

 router.get('/search', function (req, res, next) {

     var num = parseInt(req.query.offset,10);
     var limit = 1;
     (!isNaN(num)) ?  (num > 10 || num < 1) ? limit = 10 : limit = num:limit = 10;
     
   var querySearch = req.query.q || 'cats';
   var url = "https://www.googleapis.com/customsearch/v1?searchType=image&key=" + process.env.SearchApi +
    "&cx=" + process.env.SearchEngine + "&q="+querySearch+'&num='+ limit;
     
     
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      
      var imageRes = JSON.parse(body).items || []; 
      var final = [];
      imageRes.forEach(function(ele){
        final.push({
          text:ele.snippet,
          url:ele.link,
          content:ele.image.contextLink
        })
      })
      
      res.json(final)
    }
  })

});

module.exports = router;
