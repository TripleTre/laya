import {LayaWorld, LayaContainer} from '../../abstract/LayaInterface';
import {AbstractDisplayObject} from '../../abstract/AbstractDisplay';

export default class World extends AbstractDisplayObject implements LayaContainer {
    realWorld: Phaser.World;

    constructor() {
        super(-1);
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

    setWorld(w: Phaser.World) {
        this.realWorld = w;
    }
}
