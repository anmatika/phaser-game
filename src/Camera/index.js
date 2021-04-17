import Phaser from 'phaser';

class Camera {
  constructor({
    scene,
  }) {
    this.scene = scene;
    this.setupCamera();
  }

  setupCamera() {
    this.scene.cameras.main
      .setBounds(0, 0, this.scene.world.backgroundLayer.width, this.scene.world.backgroundLayer.height);
    this.scene.cameras.main.startFollow(this.scene.player.sprite);
  }
}

export default Camera;
