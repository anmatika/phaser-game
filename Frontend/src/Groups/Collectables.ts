
import 'phaser';
import Collectable from '../Collectable/Collectable';
import Collection from '../Collection';

export type CollectableProps = {
  frame?: number,
  tileset?: string
}

class Collectables extends Phaser.Physics.Arcade.StaticGroup {
  constructor(scene: Phaser.Scene) {
    super(scene.physics.world, scene);

    this.createFromConfig({
      classType: Collectable
    });
  }

  public addFromLayer(layer: Phaser.Tilemaps.ObjectLayer): void {
    layer.objects.
      filter(collectable0 => {
        return !Collection.getCollectable(collectable0.id);
      })
      .forEach(collectableO => {
        console.log('collectable0', collectableO);
        const props = this.mapProperties(collectableO.properties);
        const collectable = this.get(collectableO.x, collectableO.y, props.tileset, props.frame) as Collectable;
        collectable.id = collectableO.id;
        collectable.name = collectableO.name;
        collectable.setDepth(2);
      });
  }

  private mapProperties(propertiesList): CollectableProps {
    if (!propertiesList || propertiesList.length === 0) { return {}; }

    return propertiesList.reduce((map, obj) => {
      map[obj.name] = obj.value;
      return map;
    }, {});
  }
}

export default Collectables;
