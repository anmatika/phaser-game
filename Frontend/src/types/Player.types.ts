import { Position } from "./Position.types";

export interface IPlayer {
  sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  position: Position;
  setupAnims(): void;
  moveRight(): void;
  moveLeft(): void;
  moveUp(): void;
  moveDown(): void;
  stopAnimation(): void;
  handleMovement(): void;
  handleAnims(): void;
}

export interface PlayerArgs {
  scene: Phaser.Scene;
  speed: number;
  position: Position
}
