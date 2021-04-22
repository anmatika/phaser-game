import 'phaser';
import Player from '../Player';
import Camera from '../Camera';
import Layer from './Layer'

export default class BaseScene extends Phaser.Scene {
  protected map!: Phaser.Tilemaps.Tilemap
  protected backgroundLayer!: Phaser.Tilemaps.TilemapLayer
  protected player!: Player
  public physics!: Phaser.Physics.Arcade.ArcadePhysics
  protected portalGroup!: any
  private gameObjects!: Phaser.GameObjects.GameObject[]
  private mapPath: string
  private mapKey!: string
  private layers: Layer[]

  constructor({ key, mapPath, layers }) {
    super({ key });
    this.layers = layers
    this.mapPath = mapPath
    console.log('base constructor')
  }

  protected preload() {
    const fractions = this.mapPath.split('/')
    this.mapKey = fractions[fractions.length - 1].split('.')[0]
    this.load.tilemapTiledJSON(this.mapKey, this.mapPath);
    this.load.spritesheet('player', 'assets/spritesheets/player2.png', { frameWidth: 32, frameHeight: 40 });

    this.layers.forEach((layer, i) => {
      layer.tilesets.forEach((tileset, j) => {
        this.load.image(tileset.id, tileset.path)
      })
    })
  }

  protected createLayers(): Layer[] {
    this.map = this.make.tilemap({ key: this.mapKey });
    // loop in reverse order
    for (let i = this.layers.length - 1; i >= 0; i--) {
      const layer = this.layers[i]
      const tilesetIds = layer.tilesets.map(c => c.id)
      const tilesetImages = tilesetIds.map(id => this.map.addTilesetImage(id))
      if (tilesetImages.some(i => i == null)) {
        throw new Error("Cannot add all tileset images")
      }
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
    this.createColliders()
    this.createPortals()
    this.createCamera()

    console.log('tilemap', this.cache.tilemap.get(this.mapKey).data);
  }


  private createColliders() {
    this.layers.filter(c => c.collides).forEach((collideLayer) => {
      this.physics.add.collider(this.player.sprite, collideLayer.tileMapLayer);
    })
  }

  private createPortals() {
    this.portalGroup = this.physics.add.staticGroup();
    this.gameObjects = this.map.createFromObjects('Objects', {})

    this.gameObjects.filter(c => c.type === 'portal').forEach((object) => {
      this.portalGroup.add(object)
    });

    this.physics.add.overlap(this.player.sprite, this.portalGroup, (player, portal) => {
      console.log('collides', player, portal, this.portalGroup)

      this.scene.start(portal.data.list.toScene)
    })
  }

  private createCamera() {
    new Camera({ scene: this, backgroundLayer: this.layers.find(l => l.isBackground), player: this.player });
  }


  update() {
    // NOTE Evernote webclipper must be set off. Breaks the game.

    this.player.handleMovement();
    this.player.handleAnims();
  }
}
