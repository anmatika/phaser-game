import Collectable from '../Collectable/Collectable';
export default class Collection {
  public static collectables: Collectable[]

  public static getCollectables(): Collectable[] {
    return Collection.collectables ?? [];
  }

  public static getCollectablesByName(name: string): Collectable[] {
    return Collection.collectables.filter(c => c.name === name) ?? [];
  }

  public static getCollectable(id: number): Collectable | undefined {
    return Collection.collectables?.find(item => item.id === id);
  }

  public static getCollectableByName(name: string): Collectable | undefined {
    return Collection.collectables?.find(item => item.name === name);
  }

  public static collect(collectable: Collectable): void {
    if (!Collection.collectables) {
      Collection.collectables = [];
    }

    if (!Collection.collectables.find(item => item.id === collectable.id)) {
      Collection.collectables.push(collectable);
    }
  }
}
