import Point from './Point';

export default class SpawnPoint extends Point {
  private _fromScene: string

  constructor(x: integer, y: integer, fromScene: string, name: string) {
    super(x, y, name);
    this._fromScene = fromScene;
  }

  get fromScene(): string {
    return this._fromScene;
  }
}