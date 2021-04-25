export default class TileSet {
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