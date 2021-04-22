import 'phaser';
import Player from '../Player';
import Input from '../Input';
import Camera from '../Camera';
import BaseScene from './BaseScene';
import Layer from './Layer'
// import World from '../World';
// import Physics from '../Physics';

export default class InHouseScene extends BaseScene {
  protected player!: Player

  constructor() {
    super({
      key: 'house1',
      mapPath: 'assets/maps/house-interior1.json',
      layers: [
        new Layer('Furniture', ['assets/tilesets/RPGW_HousesAndInt_v1.1/furniture.png'], true, false),
        new Layer('Walls', ['assets/tilesets/RPGW_HousesAndInt_v1.1/interiors.png', 'assets/tilesets/RPG_Buildings_HOUSES_v1.1/houses_interriors.png'], true, false),
        new Layer('BaseLayer', ['assets/tilesets/RPGW_HousesAndInt_v1.1/interiors.png'], false, true)]
    });
  }

  preload() {
    super.preload()
  }

  create() {

    this.player = new Player({ scene: this, speed: 175, position: { x: 350, y: 550 } });
    super.createLayers()
    super.create()

    const portals = this.getPortals()
    this.player.sprite.setPosition(portals[0].x, portals[0].y - 50)

    console.log('portals', portals)
    // const doorPosition = this.getDoorPosition(door);
    // this.player = new Player({ scene: this, position: { x: doorPosition.x, y: doorPosition.y } });

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
    super.update()

  }

  render() {
    // this.game.debug.text(`Debugging Phaser ${Phaser.VERSION}`, 20, 20, 'yellow', 'Segoe UI');
  }
}
