import 'phaser';
import Player from '../Player';
import Camera from '../Camera';
import Layer from './Layer';
import Portal from './Portal';
import SpawnPoint from './SpawnPoint';

export default class BaseScene extends Phaser.Scene {
  public physics!: Phaser.Physics.Arcade.ArcadePhysics
  protected player!: Player
  private map!: Phaser.Tilemaps.Tilemap
  private portalGroup!: any
  private spawnGroup!: any
  private gameObjects!: Phaser.GameObjects.GameObject[]
  private mapPath: string
  private mapKey!: string
  private layers: Layer[]
  private key: string

  constructor({ key, mapPath, layers }) {
    super({ key });
    this.key = key;
    this.layers = layers;
    this.mapPath = mapPath;
    console.log('base constructor');
  }

  protected preload(): void {
    const fractions = this.mapPath.split('/');
    this.mapKey = fractions[fractions.length - 1].split('.')[0];
    this.load.tilemapTiledJSON(this.mapKey, this.mapPath);
    this.load.spritesheet('player', 'assets/spritesheets/player2.png', { frameWidth: 32, frameHeight: 40 });

    this.layers.forEach((layer, i) => {
      layer.tilesets.forEach((tileset, j) => {
        this.load.image(tileset.id, tileset.path);
      });
    });
  }
  protected create(data) {

    this.player = new Player({ scene: this, speed: 175, position: { x: 350, y: 550 } });
    this.createLayers();
    this.createColliders();
    this.createPortals();
    this.createSpawnPoints();
    this.createCamera();
    this.insertPlayerToSpawnPoint(data.fromScene);

    console.log('tilemap', this.cache.tilemap.get(this.mapKey).data);
  }

  public update(): void {
    // NOTE Evernote webclipper must be set off. Breaks the game.
    this.player.handleMovement();
    this.player.handleAnims();
  }

  /**
   * Create Layer[] by given constructor layers in reverse order
   * @returns Layer
   */
  private createLayers(): Layer[] {
    this.map = this.make.tilemap({ key: this.mapKey });
    // loop in reverse order
    let depth = 1;
    for (let i = this.layers.length - 1; i >= 0; i--) {
      const layer = this.layers[i];
      const tilesetIds = layer.tilesets.map(c => c.id);
      const tilesetImages = tilesetIds.map(id => this.map.addTilesetImage(id));
      if (tilesetImages.some(i => i == null)) {
        throw new Error('Cannot add all tileset images');
      }
      const createdTileMapLayer = this.map.createLayer(layer.name, tilesetImages).setDepth(depth);

      if (layer.collides) {
        createdTileMapLayer.setCollisionByExclusion([-1]);
      }

      if (layer.isBackground) {
        this.physics.world.setBounds(
          0, 0, createdTileMapLayer.width, createdTileMapLayer.height,
        );
      }

      layer.tileMapLayer = createdTileMapLayer;
      depth++;
    }
    return this.layers;
  }

  /**
   * Creates Portals which indicates locations where the Player enters to different Scene
   */
  private createPortals() {
    this.portalGroup = this.physics.add.staticGroup();
    this.gameObjects = this.map.createFromObjects('Objects', {});

    this.gameObjects.filter(c => c.type === 'portal').forEach((object) => {
      const sprite = object as Phaser.GameObjects.Sprite;
      sprite.setVisible(false);
      this.portalGroup.add(sprite);
    });

    this.physics.add.overlap(this.player.sprite, this.portalGroup, (player, portal) => {
      console.log('collides', player, portal, this.portalGroup);

      this.scene.start(portal.data.list.toScene, { fromScene: this.key });
    });
  }

  /**
   * Creates spawn points which indicates locations where the Player appears on the map when it switches the Scene
   */
  private createSpawnPoints() {
    this.spawnGroup = this.physics.add.staticGroup();
    this.gameObjects = this.map.createFromObjects('Objects', {});

    this.gameObjects.filter(c => c.type === 'spawnPoint').forEach((object) => {
      const sprite = object as Phaser.GameObjects.Sprite;
      sprite.setVisible(false);
      this.spawnGroup.add(sprite);
    });
  }

  private getPortals() {
    return this.portalGroup.children.entries.map(e => {
      return new Portal(e.x, e.y, e.data.list.toScene, e.name);
    });
  }

  private getSpawnPoints() {
    return this.spawnGroup.children.entries.map(e => {
      return new SpawnPoint(e.x, e.y, e.data.list.fromScene, e.name);
    });
  }

  private createColliders() {
    this.layers.filter(c => c.collides).forEach((collideLayer) => {
      this.physics.add.collider(this.player.sprite, collideLayer.tileMapLayer);
    });
  }

  private createCamera() {
    new Camera({ scene: this, backgroundLayer: this.layers.find(l => l.isBackground), player: this.player });
  }

  private insertPlayerToSpawnPoint(fromScene) {
    const spawnPositions = this.getSpawnPoints();
    const spawnPosition = spawnPositions.find(p => p.fromScene === (fromScene ?? 'gameStart'));
    this.player.sprite.setPosition(spawnPosition.x, spawnPosition.y);
  }
}
