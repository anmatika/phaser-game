import 'phaser';
import BaseScene from './BaseScene';
import Layer from './Layer';
export default class House1Scene extends BaseScene {
  constructor() {
    super({
      key: 'house1',
      mapPath: 'assets/maps/house1.json',
      tileSets: [
        'assets/tilesets/houses_and_interiors2/furniture.png',
        'assets/tilesets/houses_and_interiors/furnitures.png',
        'assets/tilesets/houses_and_interiors2/interiors.png',
        'assets/tilesets/houses_and_interiors/houses_interriors.png'
      ],
      layers: [
        new Layer('FurnitureNoCollide'),
        new Layer('Furniture'),
        new Layer('WallsNoCollide'),
        new Layer('Walls'),
        new Layer('OnFloor'),
        new Layer('BaseLayer')]
    });
  }

  preload(): void {
    super.preload();
  }

  create(data): void {
    super.create(data);
  }

  update(): void {
    // NOTE Evernote webclipper must be set off. Breaks the game.
    super.update();
  }
}
