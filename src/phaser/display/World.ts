import {LayaWorld} from '../../abstract/LayaInterface';
import {AbstractDisplayObject} from '../../abstract/AbstractDisplay';

export default class World implements LayaWorld {
    realWorld: Phaser.World;

    constructor(world: Phaser.World) {
        this.realWorld = world;
    }

    add(obj: AbstractDisplayObject): void {
        this.realWorld.add(obj.getRealObject());
    }

    remove(child, destroy) {
        return this.realWorld.remove(child, destroy);
    }

    destroy() {
        this.realWorld.destroy(true);
    }

    getRealObject(): Phaser.World {
        return this.realWorld;
    }
}
