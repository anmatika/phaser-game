import "phaser"
import { IPlayer } from "./Player.types";

export interface CameraArgs {
  scene: Phaser.Scene,
  backgroundLayer: any,
  player: IPlayer,
}
