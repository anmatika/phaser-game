import Phaser from 'phaser';

class World {
  constructor({
    scene,
  }) {
    this.scene = scene;
    this.setupWorld();
  }

  setupWorld() {
    this.map = this.scene.make.tilemap({ key: 'map' });
    this.tilesetGrass = this.map.addTilesetImage('grasstiles');
    this.tilesetWorld = this.map.addTilesetImage('houses');
    this.backgroundLayer = this.map.createLayer('BaseLayer', this.tilesetGrass, 0, 0).setScale(1).setDepth(1);
    this.worldLayer = this.map.createLayer('WorldLayer', this.tilesetWorld, 0, 0).setScale(1).setDepth(2);
  }

  static Create(scene) {
    World({ scene });
  }
}

export default World;
