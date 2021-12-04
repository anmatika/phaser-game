import 'phaser'
import OutdoorsScene from './Scenes/Outdoors1Scene'
import InHouseScene from './Scenes/House1Scene'
import House1Upstairs from './Scenes/House1Upstairs'
import SocketClient from './Client/SocketClient'
import { Socket } from 'socket.io-client'

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
      debug: false,
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

}

SocketClient.init()
SocketClient.open()

const game = new Phaser.Game(config)
export default game
