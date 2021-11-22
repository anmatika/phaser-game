import "phaser";

class ItemContainer extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y)
    scene.add.existing(this)
    this.setPosition(300, 300)
    this.setScrollFactor(0, 0)

  }

  setup() {
    // this.fontSize = 20
    const text = this.scene.add.text(300, 300, 'Foo', { fontSize: '20px', color: 'white' })
    text.setDepth(9)
    this.add(text)
  }
}

export default ItemContainer
