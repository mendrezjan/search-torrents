var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'Search torrents'});
});

router.get('/anime', function(req, res, next) {
  res.render('anime', {title: 'Search torrents'});
});

module.exports = router;
