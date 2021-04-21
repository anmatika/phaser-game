import 'phaser';
type Keys = {
  W: Phaser.Input.Keyboard.Key
  A: Phaser.Input.Keyboard.Key
  S: Phaser.Input.Keyboard.Key
  D: Phaser.Input.Keyboard.Key
}

class Keyboard {
}

class Input {
  private scene!: Phaser.Scene
  public cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  public keys!: Keys

  constructor({
    scene,
  }) {
    this.scene = scene;
    this.setupKeys();
  }

  public get isLeftDown(): boolean {
    return this.cursors.left.isDown
    // || this.keys.A.isDown
  }
  public get isRightDown(): boolean {
    return this.cursors.right.isDown
    // || this.keys.D.isDown
  }
  public get isDownDown(): boolean {
    return this.cursors.down.isDown
    //  || this.keys.S.isDown
  }
  public get isUpDown(): boolean {
    return this.cursors.up.isDown
    // || this.keys.W.isDown
  }

  private setupKeys() {
    this.cursors = this.scene.input.keyboard.createCursorKeys();

    // this.keys.A = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    // this.keys.S = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    // this.keys.D = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    // this.keys.W = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
  }
}

export default Input;
