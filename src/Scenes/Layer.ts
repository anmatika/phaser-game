export default class Layer {
  private _name: string
  private _collides!: boolean
  private _isBackground!: boolean
  private _tilemapLayer!: Phaser.Tilemaps.TilemapLayer

  constructor(name: string) {
    this._name = name;
  }

  get name(): string {
    return this._name;
  }

  set collides(v: boolean) {
    this._collides = v;
  }

  get collides(): boolean {
    return this._collides;
  }

  set isBackground(v: boolean) {
    this._isBackground = v;
  }

  get isBackground(): boolean {
    return this._isBackground;
  }

  get tileMapLayer(): Phaser.Tilemaps.TilemapLayer {
    return this._tilemapLayer;
  }
  set tileMapLayer(tilemapLayer) {
    this._tilemapLayer = tilemapLayer;
  }
}

