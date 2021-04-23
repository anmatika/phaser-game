import 'phaser';
import Player from '../Player';
import BaseScene from './BaseScene'
import Layer from './Layer';
export default class Outdoors1Scene extends BaseScene {
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
    super.create(data)
  }

  update() {
    // NOTE Evernote webclipper must be set off. Breaks the game.
    super.update()
  }
}
