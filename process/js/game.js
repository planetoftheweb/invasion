var gameWorld = {
  width: 608,
  height: 482
};

var player = {
  width: 32,
  height: 58,
  speed: 3
}

var game = new Phaser.Game(gameWorld.width, gameWorld.height, Phaser.AUTO, 'invasion', { preload: preload, create: create, update: update, render: render });
var cursors, wyatt;

function preload() {
  game.load.image('background', './images/background.jpg');  
  game.load.atlasJSONHash('wyatt', './images/wyatt_cycle.png', './images/wyatt_cycle.json');
}


function create() {
  background = game.add.sprite(0, 0, 'background');
  this.game.scale.pageAlignHorizontally = true;
  this.game.scale.pageAlignVertically = true;
  this.game.scale.refresh();

  //  This sprite is using a texture atlas for all of its animation data
  wyatt = game.add.sprite(game.world.centerX, game.world.centerY, 'wyatt');
  wyatt.anchor.set(0.5);

  cursors = game.input.keyboard.createCursorKeys();
  //var text = game.add.text(32, 32, 'Cursors to move', { fill: '#ffffff' });

  //  Here we add a new animation called 'run'
  //  We haven't specified any frames because it's using every frame in the texture atlas
  wyatt.animations.add('still', [0]);
  wyatt.animations.add('walk-down', [0, 4, 0, 5]);
  wyatt.animations.add('walk-left', [ 1, 2, 1, 3]);
  wyatt.animations.add('walk-right', [6, 7, 6, 8]);
  wyatt.animations.add('walk-up', [9, 10, 9, 11]);
  
}

function update() {
  if (cursors.up.isDown) {
    wyatt.animations.play('walk-up', 8, true);
    wyatt.y -= player.speed;
  } else if (cursors.down.isDown) {
    wyatt.animations.play('walk-down', 8, true);
    wyatt.y +=player.speed;
  } else if (cursors.left.isDown) {
    wyatt.animations.play('walk-left', 8, true);
    wyatt.x -= player.speed;
  } else if (cursors.right.isDown) {
    wyatt.animations.play('walk-right', 8, true);
    wyatt.x += player.speed;
  } else {
    wyatt.animations.play('still', 8, true);
  }

  if (wyatt.x > gameWorld.width + player.width) {
    wyatt.x = -player.width;
  }

  if (wyatt.y > gameWorld.height + player.height) {
    wyatt.y = -player.height;
  }

  if (wyatt.y < 0 - player.height) {
    wyatt.y = gameWorld.height + player.height;
  }

  if (wyatt.x < 0 - player.width) {
    wyatt.x = gameWorld.width;
  }


}

function render() {

  //game.debug.cameraInfo(game.camera, 32, 500);

}