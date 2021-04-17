import Phaser from 'phaser';
import Player from '../Player';
import Input from '../Input';
import Camera from '../Camera';

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
    console.log('scene', this);
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
    this.camera = new Camera({ scene: this });
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

    this.cursors = new Input({ scene: this }).cursors;
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
