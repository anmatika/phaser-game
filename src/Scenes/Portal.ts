import Point from './Point';
export default class Portal extends Point {
  private _toScene: string

  constructor(x: integer, y: integer, toScene: string, name: string) {
    super(x, y, name);
    this._toScene = toScene;
  }

  get toScene(): string {
    return this._toScene;
  }
}