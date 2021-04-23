export default class Layer {
  private _name: string
  private _tilesetPaths: string[]
  private _collides: boolean
  private _isBackGround: boolean
  private _tilemapLayer!: Phaser.Tilemaps.TilemapLayer

  constructor(name: string, tilesetPaths: string[], collides: boolean, isBackGround: boolean) {
    this._name = name;
    this._tilesetPaths = tilesetPaths;
    this._collides = collides;
    this._isBackGround = isBackGround;
  }

  get name(): string {
    return this._name;
  }
  get tilesets(): TileSet[] {
    return this._tilesetPaths.map(p => {
      return new TileSet(p);
    });
  }
  get collides(): boolean {
    return this._collides;
  }
  get isBackground(): boolean {
    return this._isBackGround;
  }

  get tileMapLayer(): Phaser.Tilemaps.TilemapLayer {
    return this._tilemapLayer;
  }
  set tileMapLayer(tilemapLayer) {
    this._tilemapLayer = tilemapLayer;
  }
}

class TileSet {
  private _path: string
  constructor(path) {
    this._path = path;
  }
  /**
   * Gets tileset id by tileset file name e.g. assets/tilesets/foo/bar.png -> bar
   * @returns tileset id
   */
  get id(): string {
    const fractions = this._path.split('/');
    const id = fractions[fractions.length - 1].split('.')[0];
    return id;
  }

  get path(): string {
    return this._path;
  }
}