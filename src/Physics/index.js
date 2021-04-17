class Physics {
  constructor({
    scene,
    player,
    backgroundLayer,
    collideLayer,
  }) {
    this.scene = scene;
    this.player = player;
    this.backgroundLayer = backgroundLayer;
    this.collideLayer = collideLayer;
    this.setupPhysics();
  }

  setupPhysics() {
    this.scene.physics.world.setBounds(
      0, 0, this.backgroundLayer.width, this.backgroundLayer.height,
    );

    if (this.collideLayer) {
      this.scene.physics.add.collider(this.player.sprite, this.collideLayer);
    }
  }
}

export default Physics;
