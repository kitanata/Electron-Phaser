'use strict';

class MainState {

  init() {
    this.left_player_score = 0;
    this.right_player_score = 0;
  }

  preload () {
    game.load.image('ball', 'images/ballGrey.png');
    game.load.image('paddle', 'images/paddleBlu.png');
  }

  create () {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    let ball = game.add.sprite(game.world.randomX, game.world.randomY, 'ball');

    let first_paddle = game.add.sprite(0, 104, 'paddle');
    this.second_paddle = game.add.sprite(696, 576, 'paddle');

    first_paddle.angle = -90;
    this.second_paddle.angle = -90;

    game.physics.enable(ball, Phaser.Physics.ARCADE);
    game.physics.enable(this.second_paddle, Phaser.Physics.ARCADE);
    
    ball.body.velocity.x = 50;
    ball.body.velocity.y = 50;

    this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);

    this.upKey.onDown.add(this.onKeyUp, this);
    this.downKey.onDown.add(this.onKeyDown, this);

    ball.body.collideWorldBounds = true;
    this.second_paddle.body.collideWorldBounds = true;

    ball.body.onWorldBounds = new Phaser.Signal()
    ball.body.onWorldBounds.add(this.onBallCollidesWithWorld, this);
    ball.body.bounce.y = 1;

    game.add.text(0, 0, this.left_player_score, {font: "72px Arial", fill: "red"});
  }

  update() {
  }

  onKeyUp() {
      this.second_paddle.y -= 40;
  }

  onKeyDown() {
    this.second_paddle.y += 40;
  }

  onBallCollidesWithWorld(sprite, up, down, left, right) {
    console.log("SIGNAL CALLED!");
    console.log(up);
    console.log(down);
    console.log(left);
    console.log(right);

    if(right)
      this.left_player_score +=1;

    else if(left)
      this.right_player_score += 1;

    /*else if(up || down) {
      sprite.body.velocity.y *= -1;
      console.log(sprite.body.bounce.y);
      console.log(sprite.body.velocity.y);
    }*/
  }

  render() {
    //note: most things in phaser is automatically rendered.
  }

};
