
var express = require('express');
var hbs = require('hbs');

/**
 * App.
 */

module.exports = express()
  .engine('html', hbs.__express)
  .set('views', __dirname)
  .use('/build', express.static(__dirname + '/build'))
  .get('*', function (req, res, next) {
    res.render('index.html');
  });