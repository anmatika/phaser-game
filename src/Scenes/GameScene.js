import Phaser from 'phaser';
import Player from '../Player';

export default class MyGame extends Phaser.Scene {
  constructor() {
    super();
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
  }

  preload() {
    this.load.image('grasstiles', 'assets/tilesets/RPGW_GrassLand_v2.0/MainLev_autotiling.png');
    this.load.image('houses', 'assets/tilesets/RPG_Buildings_HOUSES_v1.1/houses_outside_shadows.png');
    this.load.tilemapTiledJSON('map', 'assets/maps/rpgmap1.json');
    this.load.spritesheet('player', 'assets/spritesheets/player.png', { frameWidth: 64, frameHeight: 64 });
  }

  create() {
    this.setupWorld();
    this.setupInput();
    this.setupPlayer();
    this.setupPhysics();
    this.setupCamera();

    this.worldLayer.setCollisionByExclusion([-1]);
    this.physics.add.collider(this.player.sprite, this.worldLayer);
    console.log('tilemap', this.cache.tilemap.get('map').data);
    this.worldLayer.debug = true;
  }

  update() {
    // NOTE Evernote webclipper must be set off. Breaks the game.
    // console.log('angle', this.player.sprite.body.angle);

    // this.handleMovementWithVelocity();
    this.player.handleMovement();
    this.player.handleAnims();
  }

  render() {
    console.log('render');
    this.game.debug.text(`Debugging Phaser ${Phaser.VERSION}`, 20, 20, 'yellow', 'Segoe UI');
  }

  setupWorld() {
    this.map = this.make.tilemap({ key: 'map' });
    this.tilesetGrass = this.map.addTilesetImage('grasstiles');
    this.tilesetWorld = this.map.addTilesetImage('houses');
    this.backgroundLayer = this.map.createLayer('BaseLayer', this.tilesetGrass, 0, 0).setScale(1).setDepth(1);
    this.worldLayer = this.map.createLayer('WorldLayer', this.tilesetWorld, 0, 0).setScale(1).setDepth(2);
  }

  setupCamera() {
    this.cameras.main.setBounds(0, 0, this.backgroundLayer.width, this.backgroundLayer.height);
    this.cameras.main.startFollow(this.player.sprite);
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
    // this.player.sprite = this.physics.add.sprite(50, 400, 'player')
    //   .setCollideWorldBounds(true)
    //   .setDepth(2);
    this.player = new Player({ scene: this, cursors: this.cursors });

    console.log('player', this.player.sprite);
  }

  setupPhysics() {
    this.physics.world.setBounds(0, 0, this.backgroundLayer.width, this.backgroundLayer.height);
  }
}
