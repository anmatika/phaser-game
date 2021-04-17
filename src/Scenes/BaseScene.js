import Phaser from 'phaser';
import Player from '../Player';
import Input from '../Input';
import Camera from '../Camera';
import World from '../World';
import Physics from '../Physics';

export default class BaseScene extends Phaser.Scene {
  constructor({ key, mapKey }) {
    super({ key });
    this.mapKey = mapKey;
    // this.screenWidth = window.innerWidth;
    // this.screenHeight = window.innerHeight;
  }

  create() {
    this.map = this.make.tilemap({ key: this.mapKey });
    this.interior = this.map.addTilesetImage('houseinterior');

    this.backgroundLayer = this.map.createLayer('BaseLayer', this.interior, 0, 0).setScale(1).setDepth(1);
    this.wallsLayer = this.map.createLayer('Walls', [this.interior, this.tilesetDecorative], 0, 0).setScale(1).setDepth(2);
    this.wallsLayer.setCollisionByExclusion([-1]);
    this.cursors = new Input({ scene: this }).cursors;
    this.player = new Player({ scene: this });
    this.physics.world.setBounds(
      0, 0, this.backgroundLayer.width, this.backgroundLayer.height,
    );

    this.physics.add.collider(this.player.sprite, this.wallsLayer);
    this.cameras.main
      .setBounds(0, 0,
        this.backgroundLayer.width, this.backgroundLayer.height);
    this.cameras.main.startFollow(this.player.sprite);
    this.input.on('wheel', (pointer, currentlyOver, dx, dy, _dz, _event) => {
      if (dy > 0) {
        if (this.cameras.main.zoom > 1) {
          this.cameras.main.setZoom(this.cameras.main.zoom - 0.1);
        }
      } else if (dy < 0) {
        this.cameras.main.setZoom(this.cameras.main.zoom + 0.1);
      }
    });
  }

  update() {
    // NOTE Evernote webclipper must be set off. Breaks the game.
    this.player.handleMovement();
    this.player.handleAnims();
  }

  render() {
    this.game.debug.text(`Debugging Phaser ${Phaser.VERSION}`, 20, 20, 'yellow', 'Segoe UI');
  }
}
