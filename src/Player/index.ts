import Input from "../Input";

type Position = {
  x: number,
  y: number
}
interface Player {
  scene: Phaser.Scene;
  speed: number;
  position: Position
}

class Player {
  public sprite!: any
  private input: Input

  constructor({
    scene, speed = 175, position
  }) {
    this.scene = scene;
    this.speed = speed;
    this.position = position
    this.input = new Input({ scene })

    this.sprite = this.scene.physics.add.sprite(position?.x ?? 50, position?.y ?? 400, 'player')
      .setCollideWorldBounds(true)
      .setDepth(4)
      .setScale(1);
    this.setupAnims();
  }

  setupAnims() {
    const { anims } = this.scene;
    anims.create({
      key: 'runRight',
      frameRate: 10,
      repeat: -1,
      frames: anims.generateFrameNumbers('player', { start: 5, end: 9 }),
    });
    anims.create({
      key: 'runUp',
      frameRate: 10,
      repeat: -1,
      frames: anims.generateFrameNumbers('player', { start: 0, end: 4 }),
    });
    anims.create({
      key: 'runDown',
      frameRate: 10,
      repeat: -1,
      frames: anims.generateFrameNumbers('player', { start: 20, end: 24 }),
    });
  }

  moveRight() {
    this.sprite.body.setVelocityX(this.speed);
    // this.sprite.setFlipX(false);
    // this.sprite.anims.play('runRight', true);
  }

  moveLeft() {
    this.sprite.body.setVelocityX(-this.speed);
    // this.sprite.anims.play('runRight', true);
    // this.sprite.setFlipX(true);
  }

  moveUp() {
    this.sprite.body.setVelocityY(-this.speed);
    // this.sprite.anims.play('runUp', true);
    // this.sprite.setFlipX(false);
  }

  moveDown() {
    this.sprite.body.setVelocityY(this.speed);
    // this.sprite.anims.play('runDown', true);
    // this.sprite.setFlipX(false);
  }

  stopAnimation() {
    this.sprite.anims.stop();
  }

  handleMovement() {
    // Stop any previous movement from the last frame
    this.sprite.body.setVelocity(0);

    // Horizontal movement
    if (this.input.isLeftDown) {
      this.moveLeft();
    } else if (this.input.isRightDown) {
      this.moveRight();
    }

    // Vertical movement
    if (this.input.isUpDown) {
      this.moveUp();
    } else if (this.input.isDownDown) {
      this.moveDown();
    }
  }

  handleAnims() {
    if (this.input.isLeftDown) {
      this.sprite.anims.play('runRight', true);
      this.sprite.setFlipX(true);
    } else if (this.input.isRightDown) {
      this.sprite.setFlipX(false);
      this.sprite.anims.play('runRight', true);
    } else if (this.input.isUpDown) {
      this.sprite.anims.play('runUp', true);
      this.sprite.setFlipX(false);
    } else if (this.input.isDownDown) {
      this.sprite.anims.play('runDown', true);
      this.sprite.setFlipX(false);
    } else {
      this.sprite.anims.stop();
    }
  }
}

export default Player;
