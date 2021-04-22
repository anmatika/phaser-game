import 'phaser';
import Player from '../Player';
import Input from '../Input';
import Camera from '../Camera';
// import World from '../World';
interface GameObjectWithPosition extends Phaser.GameObjects.GameObject {
  x: integer,
  y: integer
}

export default class OutdoorsScene extends Phaser.Scene {
  private map!: Phaser.Tilemaps.Tilemap
  private tilesetGrass!: Phaser.Tilemaps.Tileset
  private tilesetHouses!: Phaser.Tilemaps.Tileset
  private tilesetDecorative!: Phaser.Tilemaps.Tileset
  private backgroundLayer!: Phaser.Tilemaps.TilemapLayer
  private collideLayerTop!: Phaser.Tilemaps.TilemapLayer
  private collideLayer1!: Phaser.Tilemaps.TilemapLayer
  private collideLayer2!: Phaser.Tilemaps.TilemapLayer
  private player!: Player
  public physics!: Phaser.Physics.Arcade.ArcadePhysics
  private objectGroup!: any
  private objects!: Phaser.Types.Tilemaps.TiledObject[]



  constructor() {
    super({ key: 'outDoors' });
    // this.screenWidth = window.innerWidth;
    // this.screenHeight = window.innerHeight;
  }

  preload() {
    this.load.image('grasstiles', 'assets/tilesets/RPGW_GrassLand_v2.0/MainLev_autotiling.png');
    this.load.image('decorative', 'assets/tilesets/RPGW_GrassLand_v2.0/decorative.png');
    this.load.image('houses', 'assets/tilesets/RPG_Buildings_HOUSES_v1.1/houses_outside_shadows.png');
    this.load.image('mummo', 'assets/mummo.png');
    this.load.tilemapTiledJSON('map', 'assets/maps/rpgmap1.json');
    this.load.spritesheet('player', 'assets/spritesheets/player2.png', { frameWidth: 32, frameHeight: 40 });
  }

  create(data) {
    console.log('data', data)
    //this._world = new World({ scene: this });
    this.map = this.make.tilemap({ key: 'map' });
    this.tilesetGrass = this.map.addTilesetImage('grasstiles');
    this.tilesetHouses = this.map.addTilesetImage('houses');

    console.log('houses', this.tilesetHouses);
    this.tilesetDecorative = this.map.addTilesetImage('decorative');
    console.log('deco', this.tilesetDecorative);
    this.backgroundLayer = this.map.createLayer('BaseLayer', this.tilesetGrass, 0, 0).setScale(1).setDepth(1);
    this.collideLayerTop = this.map.createLayer('CollideLayerTop', [this.tilesetHouses, this.tilesetDecorative], 0, 0).setScale(1).setDepth(4);
    this.collideLayer1 = this.map.createLayer('CollideLayer1', this.tilesetHouses, 0, 0).setScale(1).setDepth(3);
    this.collideLayer2 = this.map.createLayer('CollideLayer2', this.tilesetHouses, 0, 0).setScale(1).setDepth(2);
    this.collideLayerTop.setCollisionByExclusion([-1]);

    this.player = new Player({ scene: this, speed: 175, position: { x: 350, y: 550 } });
    this.physics.world.setBounds(
      0, 0, this.backgroundLayer.width, this.backgroundLayer.height,
    );
    this.physics.add.collider(this.player.sprite, this.collideLayerTop);

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
