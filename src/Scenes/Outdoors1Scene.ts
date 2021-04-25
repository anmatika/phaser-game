import 'phaser';
import BaseScene from './BaseScene';
export default class Outdoors1Scene extends BaseScene {
  constructor() {
    super({
      key: 'outdoors1',
      mapPath: 'assets/maps/outdoors1.json',
      tileSets: [
        'assets/tilesets/grassland/decorative.png',
        'assets/tilesets/town/houses.png',
        'assets/tilesets/decorative/fence.png',
        'assets/tilesets/decorative/fence.png',
        'assets/tilesets/grassland/MainLev_autotiling.png'
      ],
      layers: [
        'AirLayer',
        'CollideLayer',
        'CollideLayerBase',
        'BaseLayer']
    });
  }

  preload(): void {
    super.preload();
  }

  create(data: SceneData): void {
    super.create(data);
  }

  update(): void {
    // NOTE Evernote webclipper must be set off. Breaks the game.
    super.update();
  }
}
