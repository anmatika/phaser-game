import 'phaser';
class ItemContainer extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);
    console.log('xy', x, y);
    scene.add.existing(this);
    this.setPosition(100, y - 100);
    this.setScrollFactor(0);
    this.setDepth(9);
    this.setup();
  }

  setup(): void {
    const text = this.scene.add.text(0, 0, 'Foo', { fontSize: '20px', color: 'white' });

    const container = this.scene.add.container(0, 0, text);
    this.add(container);
  }
}

export default ItemContainer;
