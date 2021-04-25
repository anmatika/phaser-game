
declare type SceneData = {
  fromScene: string
}

declare type TileMapLayerProperty = {
  name: string,
  collides: boolean,
  isBackground: boolean
  value: boolean
}

declare interface BaseSceneArgs {
  key: string,
  mapPath: string,
  layers: string[],
  tileSets: string[]
}

declare interface CameraArgs {
  scene: Phaser.Scene,
  backgroundLayer: any,
  player: any,
}

interface IPlayer {
  sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  setupAnims(): void;
  moveRight(): void;
  moveLeft(): void;
  moveUp(): void;
  moveDown(): void;
  stopAnimation(): void;
  handleMovement(): void;
  handleAnims(): void;
}

declare interface PlayerArgs {
  scene: Phaser.Scene;
  speed: number;
  position: any
}
