import 'phaser';
class Hud extends Phaser.GameObjects.Container {
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
    const container = this.createImageContainer();

    this.add(container);
  }

  createImageContainer(): Phaser.GameObjects.Container {
    const text = this.scene.add.text(0, 0, '0', { fontSize: '20px', color: 'white' });
    const pot = this.scene.add.image(text.width + 5, -15, 'propsA', 10)
      .setOrigin(0)
      .setScale(1.3);
    const container = this.scene.add.container(0, 0, [text, pot]);

    return container;

  }

  addTo(): void {


  }
}

export default Hud;
