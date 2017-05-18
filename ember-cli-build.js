/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    // Add options here
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.
  var mergeTrees = require('broccoli-merge-trees');
  var broccoliSprite = require('broccoli-sprite');
  var spritesTree = broccoliSprite('public', {
    src: ['assets/images/sprites/*.png'],
    spritePath: 'assets/sprites.png',
    stylesheetPath: 'assets/sprites.css',
    stylesheet: 'css',
    stylesheetOptions: {
      prefix: 'sprite-',
      spritePath: '/assets/sprites.png',
    },
    layout: 'packed',
    //compositior: https://github.com/selaux/node-sprite-generator#optionscompositor
    compositor: 'gm', //'canvas | gm | jimp'
    // optimize png using optiPNG
    // This adds considerable build time, but can drastically reduce your sprite file size.
    // optiping: (process.env.NODE_ENV === 'production'),
  });

  // merge appTree and spritesTree
  var appTree = app.toTree();
  var mergedTree = mergeTrees([appTree, spritesTree], {
    overwrite: true
  });

  // return app.toTree();
  return mergedTree;
};
