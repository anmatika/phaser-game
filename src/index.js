import Phaser from 'phaser';

class MyGame extends Phaser.Scene {
  constructor() {
    super();
  }

  preload() {
    this.load.image('tiles', 'src/assets/tiles.png');
    this.load.image('player', 'src/assets/player.png');
    this.load.tilemapTiledJSON('BaseLayer', 'src/assets/gametile3.json');
  }

  create() {
    const map = this.add.tilemap('BaseLayer');
    // this.player = this.add.image('player')
    const tileset = map.addTilesetImage('tiles');
    this.backgroundLayer = map.createStaticLayer('BaseLayer', tileset, 0, 0);
    console.log(this.backgroundLayer);

    this.player = this.physics.add.sprite(50, 100, 'player', 6);
    this.cursors = this.input.keyboard.createCursorKeys();

    this.cameras.main.setBounds(0, 0, this.backgroundLayer.width, this.backgroundLayer.height);

    this.cameras.main.startFollow(this.player);
    this.player.setCollideWorldBounds(true);
    this.objects = map.createFromObjects('Objects', 34, 'rocks');
  }

  update() {
    // NOTE Evernote webclipper must be set off. Breaks the game.

    //  Horizontal movement every 250ms
    if (this.input.keyboard.checkDown(this.cursors.left, 150)) {
      console.log('left');
      this.player.x -= 32;
    } else if (this.input.keyboard.checkDown(this.cursors.right, 150)) {
      console.log('right');
      this.player.x += 32;
    }

    //  Vertical movement every 150ms
    if (this.input.keyboard.checkDown(this.cursors.up, 150)) {
      this.player.y -= 32;
    } else if (this.input.keyboard.checkDown(this.cursors.down, 150)) {
      this.player.y += 32;
    }
    // const velocity = 0.30;
    // console.log( this.cursors )

    // this.player.body.setVelocity(0);
    // console.log('left.down', this.cursors.left.isDown)
    // console.log('left.up', this.cursors.left.isUp)
    // console.log('right.down', this.cursors.right.isDown)
    // console.log('right.up', this.cursors.right.isUp)
    // console.log(this.player)
    //   if (this.cursors.left.isDown) {
    //       console.log('left')
    //     this.player.setVelocityX(-160);
    //     // this.player.anims.play('left', true);
    //   } else if (this.cursors.right.isDown) {

    //       console.log('right')
    //     this.player.setVelocityX(160);
    //     // this.player.anims.play('right', true);
    //   } else {
    //       console.log('none')
    //     this.player.setVelocityX(0);
    //     // this.player.anims.play('turn');
    //   }
    // if(this.player.x < 0) {
    //     this.player.x = 0;
    // }
    // if(this.player.y < 0) {
    //     this.player.y = 0;
    // }

    // // Horizontal movement
    // if (this.cursors.left.isDown)
    // {
    //     console.log('left')
    //     this.player.body.setVelocityX(-80);
    //     // this.player.body.setVelocityY(0);
    // } else if(this.cursors.left.isUp) {
    //     // this.player.body.setVelocityX(0);
    // }

    // if (this.cursors.right.isDown)
    // {
    //     console.log('right')
    //     this.player.body.setVelocityX(80);
    //     // this.player.body.setVelocityY(0);
    // } else if(this.cursors.right.isUp) {
    //     // this.player.body.setVelocityX(0);
    // }

    // if (this.cursors.up.isDown) {
    //     this.player.body.setVelocityY(-80);
    //     this.player.body.setVelocityX(0);
    // } else if (this.cursors.down.isDown) {
    //     this.player.body.setVelocityY(80);
    //     this.player.body.setVelocityX(0);
    // }
    // if (this.cursors.left.isDown) {
    //     console.log('left')
    //     this.player.x -= velocity;
    // }
    // if (this.cursors.right.isDown) {
    //     console.log('right')
    //     this.player.x += velocity;
    // }
    // if (this.cursors.up.isDown) {
    //     console.log('up')
    //     this.player.y -= velocity;
    // }
    // if (this.cursors.down.isDown) {
    //     console.log('down')
    //     this.player.y += velocity;
    // }
    // if (this.cursors.up.isDown) {
    //     this.player.setVelocityY(-30)
    // } else if (this.cursors.down.isDown) {
    //     this.player.setVelocityY(30);
    // }

    // if (this.cursors.right.isDown) {
    //     this.player.setVelocityX(30);
    // } else if (this.cursors.left.isDown) {
    //     this.player.setVelocityX(-30);
    // }
  }
}

const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 800,
  height: 600,
  scene: MyGame,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
    //   debugBodyColor: colors.hexColors.blue,
    //   debugVelocityColor: colors.hexColors.green
    },
    render: () => {
      this.debug.spriteCoords(this.player, 32, 500);
    },
  },
};

const game = new Phaser.Game(config);
