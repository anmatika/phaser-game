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
    this.load.image('mummo', 'assets/mummo.png');
    this.load.tilemapTiledJSON('map', 'assets/maps/rpgmap1.json');
    this.load.spritesheet('player', 'assets/spritesheets/player2.png', { frameWidth: 32, frameHeight: 40 });
  }

  create() {
    //this._world = new World({ scene: this });
    this.map = this.make.tilemap({ key: 'map' });
    this.tilesetGrass = this.map.addTilesetImage('grasstiles');
    this.tilesetHouses = this.map.addTilesetImage('houses');

    console.log('houses', this.tilesetHouses);
    this.tilesetDecorative = this.map.addTilesetImage('decorative');
    console.log('deco', this.tilesetDecorative);
    this.backgroundLayer = this.map.createStaticLayer('BaseLayer', this.tilesetGrass, 0, 0).setScale(1).setDepth(1);
    this.collideLayerTop = this.map.createStaticLayer('CollideLayerTop', [this.tilesetHouses, this.tilesetDecorative], 0, 0).setScale(1).setDepth(4);
    this.collideLayer1 = this.map.createStaticLayer('CollideLayer1', this.tilesetHouses, 0, 0).setScale(1).setDepth(3);
    this.collideLayer2 = this.map.createStaticLayer('CollideLayer2', this.tilesetHouses, 0, 0).setScale(1).setDepth(2);
    this.collideLayerTop.setCollisionByExclusion([-1]);
    console.log('world', this.world);
    this.cursors = new Input({ scene: this }).cursors;
    console.log('this', this)
    this.player = new Player({ scene: this });
    this.physics.world.setBounds(
      0, 0, this.backgroundLayer.width, this.backgroundLayer.height,
    );
    this.physics.add.collider(this.player.sprite, this.collideLayer);

    // new Physics({
    //   scene: this, player: this.player, backgroundLayer: this._world.backgroundLayer, collideLayer: this._world.collideLayerTop, map: this._world.map,
    // });
    // this.mummo = this.physics.add.group({
    //   key: 'mummo',
    //   repeat: 1,
    //   setXY: { x: 12, y: 0, stepX: 70 }
    // })
    console.log('this2', this)
    new Camera({ scene: this, backgroundLayer: this.backgroundLayer });
    // const objectLayer = this.world.map.getObjectLayer('Objects').objects;
    // this.co2 = this.map.getObjectLayer('Objects').objects;

    // this.objectGroup = this.physics.add.group({
    //   key: 'mummo',
    //   repeat: 1,
    //   setXY: { x: 50, y: 50 }
    // })
    this.co2 = this.map.getObjectLayer('Objects')['objects'];
    this.objectGroup = this.physics.add.staticGroup();
    // this.objectGroup.enableBody = true;
    // const co = this._world.map.createFromObjects('Objects', { gid: 2930 });
    // this.objectGroup
    console.log('co2', this.co2)

    // this.co2.forEach((object) => {
    //   console.log('object', object)
    //   let obj = this.objectGroup.create(object.x, object.y, "mummo");
    //   // this.objectGroup.add(object, true)
    //   // obj.setScale(object.width / 32, object.height / 32); //my tile size was 32
    //   obj.setOrigin(0); //the positioning was off, and B3L7 mentioned the default was 0.5
    //   obj.body.width = object.width;
    //   obj.body.height = object.height;
    //   // obj.body.width = object.width; //body of the physics body
    //   // obj.body.height = object.height;
    // });
    this.objectGroup.create(50, 300, 'mummo')
    this.objectGroup.setDepth(4)
    // const collider = new this.physics.Collider(this.physics.world, this.objectGroup, this.player, this.collideCallback)
    this.physics.add.overlap(this.player.sprite, this.objectGroup, () => {
      console.log('collides')
    })
    // this.physics.add.collider(this.player, this.objectGroup, this.collideCallback, null, this);
    // this.objectGroup.refresh()
    console.log('objectgroupt', this.objectGroup)


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
    this.game.debug.text(`Debugging Phaser ${Phaser.VERSION}`, 20, 20, 'yellow', 'Segoe UI');
  }
}
