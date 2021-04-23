import 'phaser';
import Player from '../Player';
import BaseScene from './BaseScene'
import Layer from './Layer';
export default class OutdoorsScene extends BaseScene {
  protected player!: Player

  constructor() {
    console.log('outdoors constructor')

    super({
      key: 'outDoors',
      mapPath: 'assets/maps/outdoors1.json',
      layers: [
        new Layer('CollideLayerTop', [
          'assets/tilesets/RPGW_GrassLand_v2.0/decorative.png',
          'assets/tilesets/RPG_Buildings_HOUSES_v1.1/houses_outside_shadows.png'], true, false),
        new Layer('CollideLayer2', ['assets/tilesets/RPG_Buildings_HOUSES_v1.1/houses_outside_shadows.png'], false, false),
        new Layer('CollideLayer1', ['assets/tilesets/RPG_Buildings_HOUSES_v1.1/houses_outside_shadows.png'], false, false),
        new Layer('BaseLayer', ['assets/tilesets/RPGW_GrassLand_v2.0/MainLev_autotiling.png'], false, true)]
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
    const spawnPosition = spawnPositions.find(p => p.fromScene === (data.fromScene ?? 'gameStart'))
    this.player.sprite.setPosition(spawnPosition.x, spawnPosition.y)
  }

  update() {
    // NOTE Evernote webclipper must be set off. Breaks the game.
    super.update()
  }


}
