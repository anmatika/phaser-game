import 'phaser';
import Player from '../Player';
import BaseScene from './BaseScene';
import Layer from './Layer'
export default class House1Scene extends BaseScene {
  protected player!: Player

  constructor() {
    super({
      key: 'house1',
      mapPath: 'assets/maps/house1.json',
      layers: [
        new Layer('Furniture', ['assets/tilesets/RPGW_HousesAndInt_v1.1/furniture.png'], true, false),
        new Layer('Walls', ['assets/tilesets/RPGW_HousesAndInt_v1.1/interiors.png', 'assets/tilesets/RPG_Buildings_HOUSES_v1.1/houses_interriors.png'], true, false),
        new Layer('BaseLayer', ['assets/tilesets/RPGW_HousesAndInt_v1.1/interiors.png'], false, true)]
    });
  }

  preload() {
    super.preload()
  }

  create(data) {
    this.player = new Player({ scene: this, speed: 175, position: { x: 350, y: 550 } });
    super.createLayers()
    super.create(data)

    const spawnPositions = this.getSpawnPoints()
    const spawnPosition = spawnPositions.find(p => p.fromScene === data.fromScene)
    this.player.sprite.setPosition(spawnPosition.x, spawnPosition.y)
  }

  update() {
    // NOTE Evernote webclipper must be set off. Breaks the game.
    super.update()
  }
}
