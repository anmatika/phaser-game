import 'phaser';
import BaseScene from './BaseScene';
import Layer from './Layer'
export default class House1Scene extends BaseScene {
  constructor() {
    super({
      key: 'house1',
      mapPath: 'assets/maps/house1.json',
      layers: [
        new Layer('Furniture', ['assets/tilesets/RPGW_HousesAndInt_v1.1/furniture.png'], true, false),
        new Layer('Walls', [
          'assets/tilesets/RPGW_HousesAndInt_v1.1/interiors.png',
          'assets/tilesets/RPG_Buildings_HOUSES_v1.1/houses_interriors.png'], true, false),
        new Layer('BaseLayer', ['assets/tilesets/RPGW_HousesAndInt_v1.1/interiors.png'], false, true)]
    });
  }

  preload() {
    super.preload()
  }

  create(data) {
    super.create(data)
  }

  update() {
    // NOTE Evernote webclipper must be set off. Breaks the game.
    super.update()
  }
}
