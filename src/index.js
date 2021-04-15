import Phaser from 'phaser';

class MyGame extends Phaser.Scene {
  constructor() {
    super();
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
  }

  preload() {
    this.load.image('grasstiles', 'assets/tilsetsraw/RPGW_GrassLand_v2.0/MainLev_autotiling.png');
    this.load.image('houses', 'assets/tilsetsraw/RPG_Buildings_HOUSES_v1.1/houses_outside_shadows.png');
    // this.load.image('player', 'assets/player.png');
    this.load.tilemapTiledJSON('map', 'assets/rpgmap1.json');

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

    this.worldLayer.setCollisionByExclusion([-1]);
    this.physics.add.collider(this.player, this.worldLayer);
    console.log('tilemap', this.cache.tilemap.get('map').data);

    // this.physics.arcade.enable(this.worldLayer);
    this.worldLayer.debug = true;
    // console.log('tilesetGrass', this.tileset);
  }

  update() {
    // NOTE Evernote webclipper must be set off. Breaks the game.
    // console.log('angle', this.player.body.angle);

    this.handleMovementWithVelocity();
    this.handleAnims();
  }

  render() {
    console.log('render');
    this.game.debug.text(`Debugging Phaser ${Phaser.VERSION}`, 20, 20, 'yellow', 'Segoe UI');
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
    this.tilesetGrass = this.map.addTilesetImage('grasstiles');
    this.tilesetWorld = this.map.addTilesetImage('houses');
    this.backgroundLayer = this.map.createLayer('BaseLayer', this.tilesetGrass, 0, 0).setScale(1).setDepth(1);

    this.worldLayer = this.map.createLayer('WorldLayer', this.tilesetWorld, 0, 0).setScale(1).setDepth(2);
    // this.worldLayer.setCollisionByProperty({ collides: true });
    // this.tilesetWorld.setCollisionByExclusion([-1]);
    // this.map.setCollisionBetween(1, 999, true, 'WorldLayer');
    // this.physics.add.collider(this.player, this.tilesetWorld);
    // this.map.setCollisionBetween(0, 923, true, this.worldLayer);
    // this.map.setCollisionByExclusion([], true, this.worldLayer);
  }

  setupCamera() {
    this.cameras.main.setBounds(0, 0, this.backgroundLayer.width, this.backgroundLayer.height);
    this.cameras.main.startFollow(this.player);
  }

  setupInput() {
    this.input.on('wheel', (pointer, currentlyOver, dx, dy, _dz, _event) => {
      if (dy > 0) {
        if (this.cameras.main.zoom > 1) {
          this.cameras.main.setZoom(this.cameras.main.zoom - 0.1);
        }
      } else if (dy < 0) {
        this.cameras.main.setZoom(this.cameras.main.zoom + 0.1);
      }
    });
    this.cursors = this.input.keyboard.createCursorKeys();
    this.cursors.A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.cursors.S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.cursors.D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.cursors.W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.cursors.isLeftDown = () => this.cursors.left.isDown || this.cursors.A.isDown;
    this.cursors.isRightDown = () => this.cursors.right.isDown || this.cursors.D.isDown;
    this.cursors.isUpDown = () => this.cursors.up.isDown || this.cursors.W.isDown;
    this.cursors.isDownDown = () => this.cursors.down.isDown || this.cursors.S.isDown;
    console.log('cursors', this.cursors);
  }

  setupPlayer() {
    this.player = this.physics.add.sprite(50, 400, 'player')
      .setCollideWorldBounds(true)
      .setDepth(2);

    console.log('player', this.player);
  }

  setupPhysics() {
    this.physics.world.setBounds(0, 0, this.backgroundLayer.width, this.backgroundLayer.height);
  }

  handleMovementWithVelocity() {
    const speed = 175;

    // Stop any previous movement from the last frame
    this.player.body.setVelocity(0);

    // Horizontal movement
    if (this.cursors.isLeftDown()) {
      this.player.body.setVelocityX(-speed);
    } else if (this.cursors.isRightDown()) {
      this.player.body.setVelocityX(speed);
    }

    // Vertical movement
    if (this.cursors.isUpDown()) {
      this.player.body.setVelocityY(-speed);
    } else if (this.cursors.isDownDown()) {
      this.player.body.setVelocityY(speed);
    }
  }

  handleAnims() {
    if (this.cursors.isLeftDown()) {
      this.player.anims.play('runRight', true);
      this.player.setFlipX(true);
    } else if (this.cursors.isRightDown()) {
      this.player.setFlipX(false);
      this.player.anims.play('runRight', true);
    } else if (this.cursors.isUpDown()) {
      this.player.anims.play('runUp', true);
      this.player.setFlipX(false);
    } else if (this.cursors.isDownDown()) {
      this.player.anims.play('runDown', true);
      this.player.setFlipX(false);
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
      debug: true,
      gravity: { y: 0 },
    },
  },
  scene: MyGame,

};

const game = new Phaser.Game(config);
