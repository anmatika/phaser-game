import 'phaser';
import BaseScene from './BaseScene';
import Layer from './Layer';
export default class House1Scene extends BaseScene {
  constructor() {
    super({
      key: 'house1',
      mapPath: 'assets/maps/house1.json',
      layers: [
        new Layer('Furniture', ['assets/tilesets/houses_and_interiors2/furniture.png'], true, false),
        new Layer('Walls', [
          'assets/tilesets/houses_and_interiors2/interiors.png',
          'assets/tilesets/houses_and_interiors/houses_interriors.png'], true, false),
        new Layer('BaseLayer', ['assets/tilesets/houses_and_interiors2/interiors.png'], false, true)]
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
