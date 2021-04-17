import Phaser from 'phaser';

class Input {
  constructor({
    scene,
  }) {
    this.scene = scene;
    this.setupCursors();
  }

  setupCursors() {
    this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.cursors.A = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.cursors.S = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.cursors.D = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.cursors.W = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.cursors.isLeftDown = () => this.scene.cursors.left.isDown || this.scene.cursors.A.isDown;
    this.cursors.isRightDown = () => this.scene.cursors.right.isDown || this.scene.cursors.D.isDown;
    this.cursors.isUpDown = () => this.scene.cursors.up.isDown || this.scene.cursors.W.isDown;
    this.cursors.isDownDown = () => this.scene.cursors.down.isDown || this.scene.cursors.S.isDown;
  }
}

export default Input;
