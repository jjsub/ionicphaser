var game = new Phaser.Game(400, 620, Phaser.CANVAS, 'phaser-example', {preload: preload, create: create, update: update});

function preload(){

   game.load.tilemap('map', 'assets/super_mario.json', null, Phaser.Tilemap.TILED_JSON);
   game.load.image('mario', 'assets/super_mario.png');
   game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
   game.load.spritesheet('coin', 'assets/coin.png', 32, 48);

   game.scale.pageAlignHorizontally = true;
   game.scale.pageAlignVertacally = true;

   game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

   game.scale.refresh();

}

var map, background, clunds, ground, dude;

function create(){
  game.physics.startSystem(Phaser.Physics.ARCADE);
  map = game.add.tilemap('map');
  map.addTilesetImage('super_mario', 'mario');

  background = map.createLayer('Tile Layer 1');
  clouds = map.createLayer('Clouds');
  ground = map.createLayer('Ground');
  background.resizeWorld();



  dude = game.add.sprite(0,0,'dude');
  dude.animations.add('left', [0, 1, 2, 3], 10, true);
  dude.animations.add('right', [5, 6, 7, 8], 10, true);
  game.physics.arcade.enable(dude);
  game.camera.follow(dude);


    player = game.add.sprite(0, game.world.height - 150, 'dude');

    //  We need to enable physics on the player
    game.physics.arcade.enable(player);

    //  Player physics properties. Give the little guy a slight bounce.
    //player.body.bounce.y = 0.2;
    dude.body.gravity.y = 300;
    dude.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    dude.animations.add('left', [0, 1, 2, 3], 10, true);
    dude.animations.add('right', [5, 6, 7, 8], 10, true);

    coins.enableBody = true;
    coins.physicsBodyType = Phaser.Physics.ARCADE;
    map.createFromObjects('Coins', 1, 'dude', 0, true, false, coins);
    coins.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3, 4, 5], 10, true);
    coins.callAll('animations.play', 'animations', 'spin');

}


function update(){
  if(game.input.activePointer.isDown){
    if(game.input.activePointer.x < 150){
      dude.body.velocity.x = -150;
      dude.animations.play('left');
    }else{
      dude.body.velocity.x = 150;
      dude.animations.play('right');
    }
  }else{
    dude.body.velocity.x = 0;
    dude.animations.stop();
    dude.frame = 4;
  }
}
