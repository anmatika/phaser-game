
import 'phaser';
import Collectable from '../Collectable/Collectable';

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
    layer.objects.forEach(collectableO => {
      const props = this.mapProperties(collectableO.properties);
      const collectable = this.get(collectableO.x, collectableO.y, props.tileset, props.frame);
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