import 'phaser';
import BaseScene from './BaseScene';
import Layer from './Layer';
export default class Outdoors1Scene extends BaseScene {
  constructor() {
    super({
      key: 'outdoors1',
      mapPath: 'assets/maps/outdoors1.json',
      layers: [
        new Layer(
          'AirLayer', ['assets/tilesets/grassland/decorative.png']),
        new Layer('CollideLayer', [
          'assets/tilesets/grassland/decorative.png',
          'assets/tilesets/town/houses.png',
          'assets/tilesets/decorative/fence.png'
        ]),
        new Layer('CollideLayerBase', [
          'assets/tilesets/grassland/decorative.png',
          'assets/tilesets/town/houses.png',
          'assets/tilesets/decorative/fence.png'
        ]),
        new Layer('BaseLayer', ['assets/tilesets/grassland/MainLev_autotiling.png'])]
    });
  }

  preload(): void {
    super.preload();
  }

  create(data: any): void {
    super.create(data);
  }

  update(): void {
    // NOTE Evernote webclipper must be set off. Breaks the game.
    super.update();
  }
}
