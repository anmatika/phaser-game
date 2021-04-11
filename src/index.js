import Phaser from 'phaser';

class MyGame extends Phaser.Scene {
  constructor() {
    super();
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
  }

  preload() {
    this.load.image('tileset', 'src/assets/tileset.png');
    this.load.image('player', 'src/assets/player.png');
    this.load.tilemapTiledJSON('map', 'src/assets/town.json');
  }

  create() {
    this.setupWorld();
    this.setupPlayer();
    this.setupPhysics();
    this.setupCamera();
    this.setupInput();
  }

  update() {
    // NOTE Evernote webclipper must be set off. Breaks the game.
    this.handleKeyboard();
  }

  setupWorld() {
    const map = this.make.tilemap({ key: 'map' });
    const tileset = map.addTilesetImage('tileset');
    this.backgroundLayer = map.createLayer('Below Player', tileset, 0, 0).setScale(1).setDepth(1);
    this.worldLayer = map.createLayer('World', tileset, 0, 0).setScale(1).setDepth(2);
    this.worldLayer.setCollisionByProperty({ collides: true });
  }

  setupCamera() {
    this.cameras.main.setBounds(0, 0, this.backgroundLayer.width, this.backgroundLayer.height);
    this.cameras.main.startFollow(this.player);
  }

  setupInput() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  setupPlayer() {
    this.player = this.physics.add.sprite(50, 100, 'player')
      .setCollideWorldBounds(true)
      .setDepth(2);
  }

  setupPhysics() {
    this.physics.world.setBounds(0, 0, this.backgroundLayer.width, this.backgroundLayer.height);
    this.physics.add.collider(this.player, this.worldLayer);
  }

  handleKeyboard() {
    //  Horizontal movement every 250ms
    if (this.input.keyboard.checkDown(this.cursors.left, 150)) {
      this.player.x -= 32;
    } else if (this.input.keyboard.checkDown(this.cursors.right, 150)) {
      this.player.x += 32;
    }

    //  Vertical movement every 150ms
    if (this.input.keyboard.checkDown(this.cursors.up, 150)) {
      this.player.y -= 32;
    } else if (this.input.keyboard.checkDown(this.cursors.down, 150)) {
      this.player.y += 32;
    }
  }
}

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
  scene: MyGame,

};

// const config = {
//   type: Phaser.AUTO,
//   parent: 'phaser-example',
//   width: 800,
//   height: 600,
//   scene: MyGame,
//   physics: {
//     default: 'arcade',
//     arcade: {
//       debug: true,
//     //   debugBodyColor: colors.hexColors.blue,
//     //   debugVelocityColor: colors.hexColors.green
//     },
//     render: () => {
//       this.debug.spriteCoords(this.player, 32, 500);
//     },
//   },
// };

const game = new Phaser.Game(config);
