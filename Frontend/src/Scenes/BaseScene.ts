import 'phaser';
import Player from '../Player';
import Camera from '../Camera';
import Layer from './Layer';
import Portal from './Portal';
import SpawnPoint from './SpawnPoint';
import TileSet from './TileSet';
import { Physics } from 'phaser';
import { BaseSceneArgs, SceneData } from '../types/Scene.types';
import { TileMapLayerProperty } from '../types/Map.types';
import Collectables from '../Groups/Collectables';
import Collection from '../Collection';
import Collectable from '../Collectable/Collectable';



export default class BaseScene extends Phaser.Scene {
  public physics!: Phaser.Physics.Arcade.ArcadePhysics
  protected player!: Player
  private map!: Phaser.Tilemaps.Tilemap
  private portalGroup!: Physics.Arcade.StaticGroup
  private spawnGroup!: Physics.Arcade.StaticGroup
  private collectables!: Collectables
  private mapPath: string
  private mapKey!: string
  private layers: Layer[]
  private tileSets: TileSet[]
  private key: string
  private camera!: Camera

  constructor({ key, mapPath, layers, tileSets }: BaseSceneArgs) {
    super({ key });
    this.key = key;
    this.mapPath = mapPath;
    this.tileSets = tileSets.map(c => new TileSet(c));
    this.layers = layers.map(c => new Layer(c));
  }

  protected preload(): void {
    const fractions = this.mapPath.split('/');
    const fraction = fractions[fractions.length - 1];

    // parse the file name from path without extension
    const regex = /(.+?)(\.[^.]*$|$)/g;
    const matches = fraction.match(regex);
    if (matches == null) {
      throw new Error('map key couldn\'t be parsed');
    }
    this.mapKey = matches[0];

    this.load.tilemapTiledJSON(this.mapKey, this.mapPath);
    this.load.spritesheet('player', 'assets/spritesheets/player2.png', { frameWidth: 32, frameHeight: 40 });
    this.load.spritesheet('propsA', 'assets/tilesets/decorative/propsA.png', { frameWidth: 32, frameHeight: 32 });

    this.tileSets.forEach((tileset) => {
      this.load.image(tileset.id, tileset.path);
    });
  }

  protected create(data: SceneData): void {
    this.createPlayer();
    this.createLayers();
    this.createColliders();
    this.createPortals();
    this.createPortalsOverlap();
    this.createCollectables();
    this.createCollectiblesOverlap();
    this.createSpawnPoints();
    this.createCamera();
    this.insertPlayerToSpawnPoint(data.fromScene);
    this.camera.hud.updateScores();

  }

  private createPlayer() {
    this.player = new Player({ scene: this, speed: 175, position: { x: 350, y: 550 } });
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
      console.log('layer', layer);
      const tilesetIds = this.tileSets.map(c => c.id);
      const tilesetImages = tilesetIds.map(id => this.map.addTilesetImage(id));
      if (tilesetImages.some(i => i == null)) {
        throw new Error('Cannot add all tileset images');
      }
      const createdTileMapLayer = this.map.createLayer(layer.name, tilesetImages).setDepth(depth);
      const layerProperties = createdTileMapLayer.layer.properties as TileMapLayerProperty[];

      if (layerProperties.some(c => c.name === 'collides' && c.value)) {
        createdTileMapLayer.setCollisionByExclusion([-1]);
        layer.collides = true;
      }

      if (layerProperties.some(c => c.name === 'isBackground' && c.value)) {
        layer.isBackground = true;
        this.physics.world.setBounds(
          0, 0, createdTileMapLayer.width, createdTileMapLayer.height,
        );
      }

      layer.tileMapLayer = createdTileMapLayer;
      depth++;
    }
    return this.layers;
  }

  private createCollectables() {
    this.collectables = new Collectables(this);
    const objectLayer = this.map.getObjectLayer('Collectables');

    if (objectLayer) {
      this.collectables.addFromLayer(objectLayer);
    }
  }

  private createCollectiblesOverlap() {
    this.physics.add.overlap(this.player.sprite, this.collectables, (player, collectable0) => {
      const collectable = collectable0 as Collectable;

      collectable.removeInteractive();
      collectable.setVisible(false);
      console.log('collectable', collectable);
      Collection.collect(collectable);
      this.camera.hud.updateScore(collectable.name);
      this.collectables.remove(collectable);
    });
  }

  /**
   * Creates Portals which indicates locations where the Player enters to different Scene
   */
  private createPortals() {
    this.portalGroup = this.physics.add.staticGroup();
    const portalGameObjects = this.map.createFromObjects('Portals', {});

    portalGameObjects.forEach((object) => {
      const sprite = object as Phaser.GameObjects.Sprite;
      sprite.setVisible(false);
      this.portalGroup.add(sprite);
    });
  }

  /**
   * Initializes overlapping callback of player and portal
   */
  private createPortalsOverlap() {
    this.physics.add.overlap(this.player.sprite, this.portalGroup, (player, portal) => {
      this.scene.start(portal.data.list.toScene, { fromScene: this.key });
    });
  }

  /**
   * Creates spawn points which indicates locations where the Player appears on the map when it switches the Scene
   */
  private createSpawnPoints() {
    this.spawnGroup = this.physics.add.staticGroup();
    const spawnPointGameObjects = this.map.createFromObjects('SpawnPoints', {});

    spawnPointGameObjects.forEach((object) => {
      const sprite = object as Phaser.GameObjects.Sprite;
      sprite.setVisible(false);
      this.spawnGroup.add(sprite);
    });
  }

  private getPortals() {
    return this.portalGroup.children.entries.map(e => {
      const sprite = e as Phaser.GameObjects.Sprite;
      return new Portal(sprite.x, sprite.y, e.data.list.toScene, e.name);
    });
  }

  private getSpawnPoints() {
    return this.spawnGroup.children.entries.map(e => {
      const sprite = e as Phaser.GameObjects.Sprite;
      return new SpawnPoint(sprite.x, sprite.y, e.data.list.fromScene, e.name);
    });
  }

  private createColliders() {
    this.layers.filter(c => c.collides).forEach((collideLayer) => {
      this.physics.add.collider(this.player.sprite, collideLayer.tileMapLayer);
    });
  }

  private createCamera() {
    this.camera = new Camera({ scene: this, backgroundLayer: this.layers.find(l => l.isBackground), player: this.player });
  }

  private insertPlayerToSpawnPoint(fromScene) {
    const spawnPositions = this.getSpawnPoints();
    const spawnPosition = spawnPositions.find(p => p.fromScene === (fromScene ?? 'gameStart'));
    if (spawnPosition == null) {
      throw new Error(`SpawnPoint not found fromScene ${fromScene}`);
    }
    this.player.sprite.setPosition(spawnPosition.x, spawnPosition.y);
  }
}
