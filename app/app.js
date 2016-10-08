'use strict';

if(window.$ === undefined)
  window.$ = window.jQuery = require('jquery');

$(function() {
  let main_state = new MainState();

  window.game = new Phaser.Game(800, 600, Phaser.AUTO, '', main_state);
});

