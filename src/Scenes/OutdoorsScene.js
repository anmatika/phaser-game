import Phaser from 'phaser';
import Player from '../Player';
import Input from '../Input';
import Camera from '../Camera';
import World from '../World';
import Physics from '../Physics';

export default class OutdoorsScene extends Phaser.Scene {
  constructor() {
    super({ key: 'outDoors' });
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
  }

  preload() {
    this.load.image('grasstiles', 'assets/tilesets/RPGW_GrassLand_v2.0/MainLev_autotiling.png');
    this.load.image('decorative', 'assets/tilesets/RPGW_GrassLand_v2.0/decorative.png');
    this.load.image('houses', 'assets/tilesets/RPG_Buildings_HOUSES_v1.1/houses_outside_shadows.png');
    this.load.tilemapTiledJSON('map', 'assets/maps/rpgmap1.json');
    this.load.spritesheet('player', 'assets/spritesheets/player2.png', { frameWidth: 32, frameHeight: 40 });
  }

  create() {
    this.world = new World({ scene: this });
    console.log('world', this.world);
    this.cursors = new Input({ scene: this }).cursors;
    this.player = new Player({ scene: this });
    new Physics({
      scene: this, player: this.player, backgroundLayer: this.world.backgroundLayer, collideLayer: this.world.collideLayerTop, map: this.world.map,
    });
    new Camera({ scene: this, backgroundLayer: this.world.backgroundLayer });
    // const objectLayer = this.world.map.getObjectLayer('Objects').objects;

    console.log('tilemap', this.cache.tilemap.get('map').data);
    console.log('scene', this);
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
