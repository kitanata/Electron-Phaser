'use strict';

class MainState {

  init() {
  }

  preload () {
    game.load.image('logo', 'images/phaser.png');
  }

  create () {
    var logo = game.add.sprite(game.world.centerX, game.world.centerY, 'logo');
    logo.anchor.setTo(0.5, 0.5);

    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  }

  update() {
  }

  render() {
    //note: most things in phaser is automatically rendered.
  }

};
