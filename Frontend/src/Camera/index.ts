import HealthBar from '../Hud/HealthBar';
import Layer from '../Scenes/Layer';
import { CameraArgs } from '../types/Camera.types';
import { IPlayer } from '../types/Player.types';
import Hud from '../Hud';

class Camera {
  private scene!: Phaser.Scene
  private backgroundLayer!: Layer
  private player!: IPlayer
  public hud: Hud


  constructor({
    scene, backgroundLayer, player
  }: CameraArgs) {
    this.scene = scene;
    this.backgroundLayer = backgroundLayer;
    this.player = player;
    this.setupCamera();
    this.setUpZoom();
    console.log('camera', this.scene.cameras.main);

    const healthBar = new HealthBar(this.scene, this.scene.cameras.main.x, this.scene.cameras.main.x, 100);


    // this.hud = new Hud(this.scene, this.scene.cameras.main.x, this.scene.cameras.main.worldView.height);
    this.hud = new Hud(this.scene, this.scene.cameras.main.x, this.scene.cameras.main.midPoint.y * 2 - 200);
    // this.hud = new Hud(this.scene, this.scene.cameras.main.x, 941);
    console.log('hud', this.hud, this.scene, this.scene.cameras.main.x, this.scene.cameras.main)
  }

  setupCamera(): void {
    this.scene.cameras.main
      .setBounds(0, 0,
        this.backgroundLayer.tileMapLayer.width, this.backgroundLayer.tileMapLayer.height)
      .setZoom(1.1);
    this.scene.cameras.main.startFollow(this.player.sprite);
  }

  setUpZoom(): void {
    this.scene.input.on('wheel', (pointer, currentlyOver, dx, dy, _dz, _event) => {
      if (dy > 0) {
        if (this.scene.cameras.main.zoom > 1) {
          this.scene.cameras.main.setZoom(this.scene.cameras.main.zoom - 0.1);
        }
      } else if (dy < 0) {
        this.scene.cameras.main.setZoom(this.scene.cameras.main.zoom + 0.1);
      }
    });
  }
}

export default Camera;
