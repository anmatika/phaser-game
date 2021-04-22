import 'phaser';
import Player from '../Player';
import Input from '../Input';
import Camera from '../Camera';
// import World from '../World';
import BaseScene from './BaseScene'
import Layer from './Layer';
interface GameObjectWithPosition extends Phaser.GameObjects.GameObject {
  x: integer,
  y: integer
}

export default class OutdoorsScene extends BaseScene {
  protected map!: Phaser.Tilemaps.Tilemap
  private tilesetGrass!: Phaser.Tilemaps.Tileset
  private tilesetHouses!: Phaser.Tilemaps.Tileset
  private tilesetDecorative!: Phaser.Tilemaps.Tileset
  protected backgroundLayer!: Phaser.Tilemaps.TilemapLayer
  private collideLayerTop!: Phaser.Tilemaps.TilemapLayer
  private collideLayer1!: Phaser.Tilemaps.TilemapLayer
  private collideLayer2!: Phaser.Tilemaps.TilemapLayer
  protected player!: Player
  public physics!: Phaser.Physics.Arcade.ArcadePhysics
  // private objectGroup!: any
  // private objects!: Phaser.Types.Tilemaps.TiledObject[]



  constructor() {
    console.log('outdoors constructor')

    super({
      key: 'outDoors',
      layers: [
        new Layer('CollideLayerTop', [
          'assets/tilesets/RPGW_GrassLand_v2.0/decorative.png',
          'assets/tilesets/RPG_Buildings_HOUSES_v1.1/houses_outside_shadows.png'], true, false),
        new Layer('CollideLayer2', ['assets/tilesets/RPG_Buildings_HOUSES_v1.1/houses_outside_shadows.png'], false, false),
        new Layer('CollideLayer1', ['assets/tilesets/RPG_Buildings_HOUSES_v1.1/houses_outside_shadows.png'], false, false),
        new Layer('BaseLayer', ['assets/tilesets/RPGW_GrassLand_v2.0/MainLev_autotiling.png'], false, true)]
    });
  }

  preload() {
    this.load.tilemapTiledJSON('map', 'assets/maps/rpgmap1.json');
    this.load.spritesheet('player', 'assets/spritesheets/player2.png', { frameWidth: 32, frameHeight: 40 });
    super.preload()
  }

  create() {

    const layers = super.createLayers()


    this.player = new Player({ scene: this, speed: 175, position: { x: 350, y: 550 } });

    const collideLayer = layers.find(c => c.collides)?.tileMapLayer

    if (collideLayer) {
      this.physics.add.collider(this.player.sprite, collideLayer);
    }

    super.create()

  }

  collideCallback() {
    console.log('collides!')
  }

  update() {
    // NOTE Evernote webclipper must be set off. Breaks the game.
    // this.physics.world.overlap(this.player, this.objectGroup, (plane, obstacle) => {
    //   console.log('collide door', plane, obstacle);
    // }, () => { console.log('foo') }, this);
    // const isOverlapping = this.physics.world.overlap(this.objectGroup, this.player,);
    // console.log('isOverLapping', isOverlapping)

    this.player.handleMovement();
    this.player.handleAnims();
  }

  render() {
    // this.game.debug.text(`Debugging Phaser ${Phaser.VERSION}`, 20, 20, 'yellow', 'Segoe UI');
  }
}
