
var app = require('./app');
var Builder = require('component-builder');
var express = require('express');
var fs = require('fs');
var write = fs.writeFileSync;
var hbs = require('hbs');
var Installer = require('component-installer');
var myth = require('myth');
var mkdir = require('mkdirp');

/**
 * Environment.
 */

var port = process.env.PORT || 7777;
var dev = process.env.NODE_ENV != 'production';
var dir = 'build';

/**
 * Dev?
 */

if (dev) return listen();

/**
 * Install & build.
 */

var installer = new Installer(__dirname);
var builder = new Builder(__dirname);
builder.copyFiles(true);
builder.copyAssetsTo(dir);
mkdir(dir);

installer.install(function (err) {
  if (err) throw err;
  builder.build(function (err, res) {
    if (err) throw err;
    write(dir + '/build.js', res.require + res.js + res.templates);
    write(dir + '/build.css', myth(res.css));
    listen();
  });
});

/**
 * Listen.
 */

function listen () {
  app.listen(port, function () {
    console.log('Listening on port ' + port + '...');
  });
}