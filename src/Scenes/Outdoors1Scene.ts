import 'phaser';
import BaseScene from './BaseScene';
import Layer from './Layer';
export default class Outdoors1Scene extends BaseScene {
  constructor() {
    super({
      key: 'outdoors1',
      mapPath: 'assets/maps/outdoors1.json',
      layers: [
        new Layer('CollideLayerTop', [
          'assets/tilesets/grassland/decorative.png',
          'assets/tilesets/houses_and_interiors/houses_outside_shadows.png'], true, false),
        new Layer('CollideLayer2', ['assets/tilesets/houses_and_interiors/houses_outside_shadows.png'], true, false),
        new Layer('CollideLayer1', [
          'assets/tilesets/houses_and_interiors/houses_outside_shadows.png',
          'assets/tilesets/decorative/fence.png'], true, false),
        new Layer('BaseLayer', ['assets/tilesets/grassland/MainLev_autotiling.png'], false, true)]
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
