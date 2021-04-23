export default class Point {
  private _x: integer
  private _y: integer
  private _name: string

  constructor(x: integer, y: integer, name: string) {
    this._x = x;
    this._y = y;
    this._name = name;
  }

  get x(): integer {
    return this._x;
  }
  get y(): integer {
    return this._y;
  }
  get name(): string {
    return this._name;
  }
}