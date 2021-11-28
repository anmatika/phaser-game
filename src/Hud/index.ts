import 'phaser';
import Score from '../Score';


function isText(gameObject: Phaser.GameObjects.GameObject): gameObject is Phaser.GameObjects.Text {
  return (gameObject as Phaser.GameObjects.Text).setText !== undefined;
}
function isImage(gameObject: Phaser.GameObjects.GameObject): gameObject is Phaser.GameObjects.Image {
  return (gameObject as Phaser.GameObjects.Image).setTexture !== undefined;
}

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
    const pot = {
      image: this.scene.add.image(10, -15, 'propsA', 10)
        .setName('pot')
        .setOrigin(0)
        .setScale(1.3),
      text: this.scene.add.text(0, 0, '0', { fontSize: '20px', color: 'white' })

    }

    const pot2 = {
      image: this.scene.add.image(65, -15, 'propsA', 11)
        .setName('pot2')
        .setOrigin(0)
        .setScale(1.3),
      text: this.scene.add.text(60, 0, '0', { fontSize: '20px', color: 'white' })
    }

    // const pot2text = this.scene.add.text(pottext.x + 65, 0, '0', { fontSize: '20px', color: 'white' });
    // const pot2 = this.scene.add.image(pot2text.x + 5, -15, 'propsA', 11)
    //   .setName('pot2')
    //   .setOrigin(0)
    //   .setScale(1.3);

    const container = this.scene.add.container(0, 0, [pot.text, pot.image, pot2.text, pot2.image]);
    container.setName('hud')

    return container;

  }

  updateScore(name: string): void {
    const container = this.getByName('hud') as Phaser.GameObjects.Container
    console.log('container', container)
    const text: Phaser.GameObjects.Text = container.list[0] as Phaser.GameObjects.Text;
    const pot: Phaser.GameObjects.Image = container.list[1] as Phaser.GameObjects.Image;
    const text2: Phaser.GameObjects.Text = container.list[2] as Phaser.GameObjects.Text;
    const pot2: Phaser.GameObjects.Image = container.list[3] as Phaser.GameObjects.Image;

    const score = Score.scores.find(s => s.name === name)?.value

    if (!score) {
      throw new Error('Score not found')
    }

    switch (name) {
      case 'pot':
        text.setText(score.toString())
        break;
      case 'pot2':
        text2.setText(score.toString())
        break;
    }

  }

}

export default Hud;
