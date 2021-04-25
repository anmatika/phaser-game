import 'phaser';
import BaseScene from './BaseScene';
export default class House1UpstairsScene extends BaseScene {
  constructor() {
    super({
      key: 'house1.upstairs',
      mapPath: 'assets/maps/house1.upstairs.json',
      tileSets: [
        'assets/tilesets/houses_and_interiors2/furniture.png',
        'assets/tilesets/houses_and_interiors/furnitures.png',
        'assets/tilesets/houses_and_interiors2/interiors.png',
        'assets/tilesets/houses_and_interiors/houses_interriors.png'
      ],
      layers: [
        'FurnitureNoCollide',
        'Furniture',
        'WallsNoCollide',
        'Walls',
        'OnFloor',
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
