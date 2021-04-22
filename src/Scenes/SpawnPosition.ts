
export default class SpawnPosition {
  private _x: integer
  private _y: integer
  private _name: string
  private _fromScene: string

  constructor(x: integer, y: integer, fromScene: string, name: string) {
    this._x = x
    this._y = y
    this._fromScene = fromScene
    this._name = name
  }

  get x(): integer {
    return this._x;
  }
  get y(): integer {
    return this._y
  }
  get fromScene(): string {
    return this._fromScene
  }
  get name(): string {
    return this._name
  }
}