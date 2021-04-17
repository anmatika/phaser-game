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
      .setBounds(0, 0, this.scene.backgroundLayer.width, this.scene.backgroundLayer.height);
    this.scene.cameras.main.startFollow(this.scene.player.sprite);
  }
}

export default Camera;
