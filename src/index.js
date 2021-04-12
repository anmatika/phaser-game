import Phaser from 'phaser';

class MyGame extends Phaser.Scene {
  constructor() {
    super();
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
  }

  preload() {
    this.load.image('tileset', 'assets/tileset.png');
    // this.load.image('player', 'assets/player.png');
    this.load.tilemapTiledJSON('map', 'assets/town.json');

    this.load.multiatlas('atlas', 'assets/spritesheets/player/player.json', 'assets');
    // this.load.spritesheet('player', 'assets/spritesheets/player/spritesheet/player.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('player', 'assets/spritesheets/player.png', { frameWidth: 64, frameHeight: 64 });
    // this.load.spritesheet('player', 'assets/spritesheets/mummy37x45.png', { frameWidth: 37, frameHeight: 45 });
  }

  create() {
    this.setupWorld();
    this.setupAnims();
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
    this.handleAnims();
  }

  setupAnims() {
    const { anims } = this;
    anims.create({
      key: 'runRight',
      frameRate: 10,
      repeat: -1,
      frames: this.anims.generateFrameNumbers('player', { start: 5, end: 9 }),
    });
    anims.create({
      key: 'runUp',
      frameRate: 10,
      repeat: -1,
      frames: this.anims.generateFrameNumbers('player', { start: 0, end: 4 }),
    });
    anims.create({
      key: 'runDown',
      frameRate: 10,
      repeat: -1,
      frames: this.anims.generateFrameNumbers('player', { start: 20, end: 24 }),
    });
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

    console.log('player', this.player);
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

  handleAnims() {
    if (this.cursors.left.isDown) {
      // this.player.anims.play('misa-left-walk', true);
      this.player.anims.play('runRight', true);
      this.player.setFlipX(true);
    } else if (this.cursors.right.isDown) {
      this.player.setFlipX(false);
      this.player.anims.play('runRight', true);
    } else if (this.cursors.up.isDown) {
      this.player.anims.play('runUp', true);
      this.player.setFlipX(false);
    } else if (this.cursors.down.isDown) {
      this.player.anims.play('runDown', true);
      this.player.setFlipX(false);
      // this.player.anims.play('misa-front-walk', true);
    } else {
      this.player.anims.stop();
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
