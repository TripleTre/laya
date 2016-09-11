import {LayaContainer} from '../../abstract/LayaInterface';
import {AbstractDisplayObject} from '../../abstract/AbstractDisplay';
import display from '../../decorators/Display';
import Graphics from './Graphics';

@display({
    require: [],
    optional: ['name'],
    name: 'Container'
})
export default class Container extends AbstractDisplayObject implements LayaContainer {
    realObject: Phaser.Group;

    buildRealObject(game, require, optional) {
        this.realObject = new Phaser.Group(game.realGame, null, optional.name);
    }

    add(obj: AbstractDisplayObject): void {
        this.realObject.add(obj.getRealObject());
    }

    remove(child, destroy): boolean {
        return this.realObject.remove(child, destroy);
    }

    getRealObject(): Phaser.Group {
        return this.realObject;
    }

    destroy(): void {
        this.realObject.destroy(true);
        this.realObject = null;
    }

    set Mask(value: Graphics) {
        this.realObject.mask = value.getRealObject();
    }

    set alpha(value: number) {
        this.realObject.alpha = value;
    }

    set inputEnable(value: boolean) {
        this.realObject.ignoreChildInput = !value;
    }

    set y(value: number) {
        this.realObject.y = value;
    }

    set x(value: number) {
        this.realObject.x = value;
    }

    set visible(value) {
        this.realObject.visible = value;
    }
}
