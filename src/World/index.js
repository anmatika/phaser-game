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
    this.tilesetHouses = this.map.addTilesetImage('houses');
    this.backgroundLayer = this.map.createLayer('BaseLayer', this.tilesetGrass, 0, 0).setScale(1).setDepth(1);
    this.collideLayer = this.map.createLayer('CollideLayer', this.tilesetHouses, 0, 0).setScale(1).setDepth(2);
    this.collideLayer.setCollisionByExclusion([-1]);
  }

  static Create(scene) {
    World({ scene });
  }
}

export default World;
