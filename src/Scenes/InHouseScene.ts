import 'phaser';
import Player from '../Player';
import Input from '../Input';
import Camera from '../Camera';
// import World from '../World';
// import Physics from '../Physics';

export default class InHouseScene extends Phaser.Scene {
  private map!: Phaser.Tilemaps.Tilemap
  private interior!: Phaser.Tilemaps.Tileset
  private interior2!: Phaser.Tilemaps.Tileset
  private furniture!: Phaser.Tilemaps.Tileset
  private backgroundLayer!: Phaser.Tilemaps.TilemapLayer
  private wallsLayer!: Phaser.Tilemaps.TilemapLayer
  private furnitureLayer!: Phaser.Tilemaps.TilemapLayer
  private player!: Player
  public physics!: Phaser.Physics.Arcade.ArcadePhysics
  private objectGroup!: Phaser.Physics.Arcade.StaticGroup
  private objects!: Phaser.Types.Tilemaps.TiledObject[]


  constructor() {
    super({ key: 'inHouse' });
  }

  preload() {
    this.load.image('houseinterior', 'assets/tilesets/RPGW_HousesAndInt_v1.1/interiors.png');
    this.load.image('housesinteriors2', 'assets/tilesets/RPG_Buildings_HOUSES_v1.1/houses_interriors.png');
    this.load.image('furniture', 'assets/tilesets/RPGW_HousesAndInt_v1.1/furniture.png');
    this.load.tilemapTiledJSON('interiorMap', 'assets/maps/house-interior1.json');
    this.load.spritesheet('player', 'assets/spritesheets/player2.png', { frameWidth: 32, frameHeight: 40 });
  }

  create() {
    this.map = this.make.tilemap({ key: 'interiorMap' });

    this.interior = this.map.addTilesetImage('houseinterior');
    this.interior2 = this.map.addTilesetImage('housesinteriors2')
    this.furniture = this.map.addTilesetImage('furniture')

    this.backgroundLayer = this.map.createLayer('BaseLayer', this.interior, 0, 0).setScale(1).setDepth(1);
    this.wallsLayer = this.map.createLayer('Walls', [this.interior, this.interior2], 0, 0).setScale(1).setDepth(2);
    this.furnitureLayer = this.map.createLayer('Furniture', [this.furniture, this.interior], 0, 0).setScale(1).setDepth(2);

    this.wallsLayer.setCollisionByExclusion([-1]);
    this.furnitureLayer.setCollisionByExclusion([-1]);

    this.objects = this.map.getObjectLayer('Objects').objects
    const door = this.objects.find(c => c.name === 'HouseExit')

    const doorPosition = this.getDoorPosition(door);
    this.player = new Player({ scene: this, position: { x: doorPosition.x, y: doorPosition.y } });

    new Camera({ scene: this, backgroundLayer: this.backgroundLayer, player: this.player });
    this.physics.add.collider(this.player.sprite, this.furnitureLayer);
    this.physics.add.collider(this.player.sprite, this.wallsLayer);

    this.objectGroup = this.physics.add.staticGroup();

    this.objects.forEach((object) => {
      this.objectGroup.create(object.x, object.y);
    });

    this.physics.add.overlap(this.player.sprite, this.objectGroup, () => {
      console.log('collides')
      this.scene.start('outDoors')
    })
  }

  getDoorPosition(door: Phaser.Types.Tilemaps.TiledObject | undefined) {
    if (door) {
      const offSet = 40;

      return {
        x: door.x,
        y: door?.y === undefined ? 0 : door.y - offSet
      }
    }

    return {
      x: 50,
      y: 50
    }

  }

  update() {
    // NOTE Evernote webclipper must be set off. Breaks the game.
    this.player.handleMovement();
    this.player.handleAnims();
  }

  render() {
    // this.game.debug.text(`Debugging Phaser ${Phaser.VERSION}`, 20, 20, 'yellow', 'Segoe UI');
  }
}
