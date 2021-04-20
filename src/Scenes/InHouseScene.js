import Phaser from 'phaser';
import Player from '../Player';
import Input from '../Input';
import Camera from '../Camera';
import World from '../World';
import Physics from '../Physics';

export default class InHouseScene extends Phaser.Scene {
  constructor() {
    super({ key: 'inHouse' });
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
  }

  preload() {
    // this.load.image('grasstiles', 'assets/tilesets/RPGW_GrassLand_v2.0/MainLev_autotiling.png');
    // this.load.image('decorative', 'assets/tilesets/RPGW_GrassLand_v2.0/decorative.png');
    this.load.image('houseinterior', 'assets/tilesets/RPGW_HousesAndInt_v1.1/interiors.png');
    this.load.image('houseinterior2', 'assets/tilesets/RPG_Buildings_HOUSES_v1.1/houses_interriors.png');
    // this.load.tilemapTiledJSON('map', 'assets/maps/rpgmap1.json');
    this.load.tilemapTiledJSON('interiorMap', 'assets/maps/house-interior1.json');
    this.load.spritesheet('player', 'assets/spritesheets/player2.png', { frameWidth: 32, frameHeight: 40 });
  }

  create() {
    this.map = this.make.tilemap({ key: 'interiorMap' });
    this.interior = this.map.addTilesetImage('houseinterior');
    this.interior2 = this.map.addTilesetImage('houseinterior2')
    this.backgroundLayer = this.map.createLayer('BaseLayer', this.interior, 0, 0).setScale(1).setDepth(1);
    this.wallsLayer = this.map.createLayer('Walls', [this.interior, this.interior2], 0, 0).setScale(1).setDepth(2);
    this.wallsLayer.setCollisionByExclusion([-1]);

    this.cursors = new Input({ scene: this }).cursors;
    this.player = new Player({ scene: this });
    new Physics({
      scene: this,
      player: this.player,
      backgroundLayer: this.backgroundLayer,
      collideLayer: this.wallsLayer,
    });
    new Camera({ scene: this, backgroundLayer: this.backgroundLayer });

    this.objectGroup = this.physics.add.staticGroup();
    const co = this.map.createFromObjects('Objects');
    console.log('co2', this.co2)

    co.forEach((object) => {
      console.log('object', object)
      let obj = this.objectGroup.create(object.x, object.y);
      obj.setOrigin(0);
      obj.body.width = object.width;
      obj.body.height = object.height;
    });

    this.physics.add.overlap(this.player.sprite, this.objectGroup, () => {
      console.log('collides')
      this.scene.start('outDoors')
    })
  }

  update() {
    // NOTE Evernote webclipper must be set off. Breaks the game.
    this.player.handleMovement();
    this.player.handleAnims();
  }

  render() {
    this.game.debug.text(`Debugging Phaser ${Phaser.VERSION}`, 20, 20, 'yellow', 'Segoe UI');
  }
}
