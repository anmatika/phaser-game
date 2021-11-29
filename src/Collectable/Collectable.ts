import 'phaser';

class Collectable extends Phaser.Physics.Arcade.Sprite {

	public id!: number

	constructor(scene: Phaser.Scene, x: number, y: number, key: string, frame: number) {
	  super(scene, x, y, key, frame);

	  this.setOrigin(0, 1);

	  scene.tweens.add({
	    targets: this,
	    y: this.y - 3,
	    duration: Phaser.Math.Between(1500, 2500),
	    repeat: -1,
	    easy: 'linear',
	    yoyo: true
	  });
	}
}

export default Collectable;

