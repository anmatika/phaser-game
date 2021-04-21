// class World {
//   constructor({
//     scene,
//   }) {
//     this.scene = scene;
//     this.setupWorld();
//   }

//   setupWorld() {
//     this.map = this.scene.make.tilemap({ key: 'map' });
//     this.tilesetGrass = this.map.addTilesetImage('grasstiles');
//     this.tilesetHouses = this.map.addTilesetImage('houses');

//     console.log('houses', this.tilesetHouses);
//     this.tilesetDecorative = this.map.addTilesetImage('decorative');
//     console.log('deco', this.tilesetDecorative);
//     this.backgroundLayer = this.map.createLayer('BaseLayer', this.tilesetGrass, 0, 0).setScale(1).setDepth(1);
//     this.collideLayerTop = this.map.createLayer('CollideLayerTop', [this.tilesetHouses, this.tilesetDecorative], 0, 0).setScale(1).setDepth(4);
//     this.collideLayer1 = this.map.createLayer('CollideLayer1', this.tilesetHouses, 0, 0).setScale(1).setDepth(3);
//     this.collideLayer2 = this.map.createLayer('CollideLayer2', this.tilesetHouses, 0, 0).setScale(1).setDepth(2);
//     this.collideLayerTop.setCollisionByExclusion([-1]);
//   }

//   static Create(scene) {
//     World({ scene });
//   }
// }

// export default World;
