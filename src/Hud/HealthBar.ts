import "phaser";

class Healthbar {
  private bar: Phaser.GameObjects.Graphics
  private x: integer
  private y: integer
  private size: any

  constructor(scene: Phaser.Scene, x: integer, y: integer, health) {
    this.bar = new Phaser.GameObjects.Graphics(scene).setDepth(9)
    this.x = x;
    this.y = y;
    this.size = {
      width: 40,
      height: 10
    }

    scene.add.existing(this.bar)
    this.draw()
  }

  draw() {
    this.bar.clear()
    this.bar.fillStyle(0x9B00FF)
    console.log('draw', this.x, this.y, this.size.width, this.size.height)
    this.bar.fillRect(this.x, this.y, this.size.width, this.size.height)
  }
}

export default Healthbar
