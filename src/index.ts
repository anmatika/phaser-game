import 'phaser';
import OutdoorsScene from './Scenes/OutdoorsScene';
import InHouseScene from './Scenes/InHouseScene';

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: {
        y: 0
      }
    },
    scale: {
      // mode: Phaser.Scale.FIT,
      // autoCenter: Phaser.Scale.CENTER_BOTH,
      // parent: "thegame"
    },
    // pixelArt: true,

  },
  // scene: [InHouseScene],
  scene: [OutdoorsScene, InHouseScene],

};

const game = new Phaser.Game(config);
export default game;
