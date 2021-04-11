import Phaser from 'phaser';

class MyGame extends Phaser.Scene {
  constructor() {
    super();
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
  }

  preload() {
    this.load.image('tileset', 'src/assets/tileset.png');
    this.load.image('player', 'src/assets/player.png');
    this.load.tilemapTiledJSON('map', 'src/assets/town.json');
  }

  create() {
    this.setupWorld();
    this.setupPlayer();
    this.setupPhysics();
    this.setupCamera();
    this.setupInput();
    console.log('tilemap', this.cache.tilemap.get('map').data);
    console.log('tileset', this.tileset);
  }

  update() {
    // NOTE Evernote webclipper must be set off. Breaks the game.
    this.handleMovementWithVelocity();
  }

  setupWorld() {
    this.map = this.make.tilemap({ key: 'map' });
    this.tileset = this.map.addTilesetImage('tileset');
    this.backgroundLayer = this.map.createLayer('Below Player', this.tileset, 0, 0).setScale(1).setDepth(1);
    this.worldLayer = this.map.createLayer('World', this.tileset, 0, 0).setScale(1).setDepth(2);
    this.worldLayer.setCollisionByProperty({ collides: true });
  }

  setupCamera() {
    this.cameras.main.setBounds(0, 0, this.backgroundLayer.width, this.backgroundLayer.height);
    this.cameras.main.startFollow(this.player);
  }

  setupInput() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  setupPlayer() {
    this.player = this.physics.add.sprite(50, 100, 'player')
      .setCollideWorldBounds(true)
      .setDepth(2);
  }

  setupPhysics() {
    this.physics.world.setBounds(0, 0, this.backgroundLayer.width, this.backgroundLayer.height);
    this.physics.add.collider(this.player, this.worldLayer);
  }

  handleMovementWithVelocity() {
    const speed = 175;

    // Stop any previous movement from the last frame
    this.player.body.setVelocity(0);

    // Horizontal movement
    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-speed);
    } else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(speed);
    }

    // Vertical movement
    if (this.cursors.up.isDown) {
      this.player.body.setVelocityY(-speed);
    } else if (this.cursors.down.isDown) {
      this.player.body.setVelocityY(speed);
    }
  }
}

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: { y: 0 },
    },
  },
  scene: MyGame,

};

const game = new Phaser.Game(config);
