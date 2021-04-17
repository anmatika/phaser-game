import Phaser from 'phaser';
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
      gravity: { y: 0 },
    },
  },
  // scene: [InHouseScene],
  scene: [OutdoorsScene, InHouseScene],

};

export default new Phaser.Game(config);
