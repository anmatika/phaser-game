class Physics {
  constructor({
    scene,
    player,
    backgroundLayer,
    collideLayer,
    map,
  }) {
    this.scene = scene;
    this.player = player;
    this.backgroundLayer = backgroundLayer;
    this.collideLayer = collideLayer;
    this.map = map;
    this.setupPhysics();
  }

  setupPhysics() {
    this.scene.physics.world.setBounds(
      0, 0, this.backgroundLayer.width, this.backgroundLayer.height,
    );
    const co = this.map.createFromObjects('Objects');
    this.co2 = this.map.getObjectLayer('Objects').objects;

    this.objectGroup = this.scene.physics.add.staticGroup();

    this.co2.forEach((object) => {
      const obj = this.objectGroup.create(object.x, object.y, 'coin');
    });
    console.log({ co, co2: this.co2 });
    this.scene.physics.add.overlap(this.player, this.objectGroup, (plane, obstacle) => {
      console.log('collide door', plane, obstacle);
    });

    if (this.collideLayer) {
      this.scene.physics.add.collider(this.player.sprite, this.collideLayer);
    }
  }
}

export default Physics;
