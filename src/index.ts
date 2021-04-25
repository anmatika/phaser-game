import 'phaser';
import OutdoorsScene from './Scenes/Outdoors1Scene';
import InHouseScene from './Scenes/House1Scene';
import House1Upstairs from './Scenes/House1Upstairs';

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight - 4,
  fps: {
    // target: 120,
    // min: 60,
    // forceSetTimeOut: true
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: {
        y: 0
      }
    },

    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    // pixelArt: true,

  },
  scene: [OutdoorsScene, InHouseScene, House1Upstairs],

};

const game = new Phaser.Game(config);
export default game;
