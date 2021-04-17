class Physics {
  constructor({
    scene,
  }) {
    this.scene = scene;
    this.setupPhysics();
  }

  setupPhysics() {
    this.scene.physics.world.setBounds(
      0, 0, this.scene.world.backgroundLayer.width, this.scene.world.backgroundLayer.height,
    );

    this.scene.physics.add.collider(this.scene.player.sprite, this.scene.world.collideLayerTop);
  }
}

export default Physics;
