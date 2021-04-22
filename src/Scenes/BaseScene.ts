import 'phaser';
import Player from '../Player';
import Camera from '../Camera';

export default class BaseScene extends Phaser.Scene {
  protected map!: Phaser.Tilemaps.Tilemap
  // private tilesetGrass!: Phaser.Tilemaps.Tileset
  // private tilesetHouses!: Phaser.Tilemaps.Tileset
  // private tilesetDecorative!: Phaser.Tilemaps.Tileset
  protected backgroundLayer!: Phaser.Tilemaps.TilemapLayer
  // private collideLayerTop!: Phaser.Tilemaps.TilemapLayer
  // private collideLayer1!: Phaser.Tilemaps.TilemapLayer
  // private collideLayer2!: Phaser.Tilemaps.TilemapLayer
  protected player!: Player
  public physics!: Phaser.Physics.Arcade.ArcadePhysics
  protected objectGroup!: any
  private objects!: Phaser.Types.Tilemaps.TiledObject[]

  constructor({ key }) {
    super({ key });
    console.log('base constructor')
  }

  preload() {

  }

  protected create() {


    new Camera({ scene: this, backgroundLayer: this.backgroundLayer, player: this.player });
    this.objectGroup = this.physics.add.staticGroup();
    this.objects = this.map.getObjectLayer('Objects').objects

    this.objects.forEach((object) => {
      this.objectGroup.create(object.x, object.y);
    });

    this.physics.add.overlap(this.player.sprite, this.objectGroup, () => {
      console.log('collides')
      this.scene.start('inHouse')
    })


    console.log('tilemap', this.cache.tilemap.get('map').data);
    console.log('scene', this);
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
