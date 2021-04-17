class Camera {
  constructor({
    scene,
  }) {
    this.scene = scene;
    this.setupCamera();
    this.setUpZoom();
  }

  setupCamera() {
    this.scene.cameras.main
      .setBounds(0, 0,
        this.scene.world.backgroundLayer.width, this.scene.world.backgroundLayer.height);
    this.scene.cameras.main.startFollow(this.scene.player.sprite);
  }

  setUpZoom() {
    this.scene.input.on('wheel', (pointer, currentlyOver, dx, dy, _dz, _event) => {
      if (dy > 0) {
        if (this.scene.cameras.main.zoom > 1) {
          this.scene.cameras.main.setZoom(this.scene.cameras.main.zoom - 0.1);
        }
      } else if (dy < 0) {
        this.scene.cameras.main.setZoom(this.scene.cameras.main.zoom + 0.1);
      }
    });
  }
}

export default Camera;
