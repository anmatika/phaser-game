import 'phaser';
import Player from '../Player';
import Camera from '../Camera';
import Layer from './Layer'

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
  private layers: Layer[]

  constructor({ key, layers }) {
    super({ key });
    this.layers = layers
    console.log('base constructor')
  }

  protected preload() {
    this.layers.forEach((layer, i) => {
      layer.tilesets.forEach((tileset, j) => {
        this.load.image(tileset.id, tileset.path)
      })
    })
  }

  protected createLayers(): Layer[] {
    this.map = this.make.tilemap({ key: 'map' });
    // loop in reverse order
    for (let i = this.layers.length - 1; i >= 0; i--) {
      const layer = this.layers[i]
      const tilesetIds = layer.tilesets.map(c => c.id)
      const tilesetImages = tilesetIds.map(i => this.map.addTilesetImage(i))
      const createdTileMapLayer = this.map.createLayer(layer.name, tilesetImages)

      if (layer.collides) {
        createdTileMapLayer.setCollisionByExclusion([-1]);
      }

      if (layer.isBackground) {
        this.physics.world.setBounds(
          0, 0, createdTileMapLayer.width, createdTileMapLayer.height,
        )
      }

      layer.tileMapLayer = createdTileMapLayer
    }
    return this.layers
  }

  protected create() {
    const backgroundLayer = this.layers.find(l => l.isBackground)


    new Camera({ scene: this, backgroundLayer, player: this.player });
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
