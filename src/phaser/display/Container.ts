import {LayaContainer} from '../../abstract/LayaInterface';
import {AbstractDisplayObject} from '../../abstract/AbstractDisplay';
import display from '../../decorators/Display';
import Graphics from './Graphics';
import setUp from '../chain/SetUp';
import userInterface from '../chain/UserInterface';

@display({
    require: [],
    optional: ['name'],
    name: 'Container'
})
export default class Container extends AbstractDisplayObject<Phaser.Group> implements LayaContainer {
    realObject:   Phaser.Group;

    buildRealObject(game, require, optional) {
        this.realObject = new Phaser.Group(game.realGame, null, optional.name);
    }

    add(obj: AbstractDisplayObject<any>): void {
        this.realObject.add(obj.getRealObject());
    }

    remove(child, destroy): boolean {
        return this.realObject.remove(child, destroy);
    }

    set Mask(value: Graphics) {
        this.realObject.mask = value.getRealObject();
    }

    set inputEnable(value: boolean) {
        this.realObject.ignoreChildInput = !value;
    }
}

setUp(Container.prototype, userInterface);
