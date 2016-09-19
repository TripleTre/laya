import {LayaContainer} from '../../abstract/LayaInterface';
import {AbstractDisplayObject} from '../../abstract/AbstractDisplay';

export default class World extends AbstractDisplayObject<any> implements LayaContainer {
    realObject: Phaser.World;

    // constructor() {
    //     super(-1);
    // }

    buildRealObject(game, require, optional) {
        //
    }

    add(obj: AbstractDisplayObject<any>): void {
        this.realObject.add(obj.getRealObject());
    }

    remove(child, destroy) {
        return this.realObject.remove(child, destroy);
    }

    setWorld(w: Phaser.World) {
        this.realObject = w;
    }
}
