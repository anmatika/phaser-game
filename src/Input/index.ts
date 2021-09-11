import 'phaser';
class Keys {
  W: Phaser.Input.Keyboard.Key
  A: Phaser.Input.Keyboard.Key
  S: Phaser.Input.Keyboard.Key
  D: Phaser.Input.Keyboard.Key

  constructor(scene) {
    this.A = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.S = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.D = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.W = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
  }
}
class Input {
  private scene!: Phaser.Scene
  public cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  public keys!: Keys

  constructor({
    scene,
  }) {
    this.scene = scene;
    this.keys = new Keys(scene);
    this.cursors = this.scene.input.keyboard.createCursorKeys();
  }

  public get isLeftDown(): boolean {
    return this.cursors.left.isDown
      || this.keys.A.isDown;
  }
  public get isRightDown(): boolean {
    return this.cursors.right.isDown
      || this.keys.D.isDown;
  }
  public get isDownDown(): boolean {
    return this.cursors.down.isDown
      || this.keys.S.isDown;
  }
  public get isUpDown(): boolean {
    return this.cursors.up.isDown
      || this.keys.W.isDown;
  }
}

export default Input;
