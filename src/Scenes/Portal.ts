
export default class Portal {
  private _x: integer
  private _y: integer
  private _name: string
  private _toScene: string

  constructor(x: integer, y: integer, toScene: string, name: string) {
    this._x = x
    this._y = y
    this._toScene = toScene
    this._name = name
  }

  get x(): integer {
    return this._x;
  }
  get y(): integer {
    return this._y
  }
  get toScene(): string {
    return this._toScene
  }
  get name(): string {
    return this._name
  }
}