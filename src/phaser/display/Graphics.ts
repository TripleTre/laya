import {AbstractDisplayObject} from '../../abstract/AbstractDisplay';
import display from '../../decorators/Display';
import Rectangle from '../support/Rectangle';

@display({
    require: ['x', 'y'],
    name: 'Graphics'
})
export default class Graphics extends AbstractDisplayObject {
    private realObject: Phaser.Graphics;

    buildRealObject(game, require, optional) {
        this.realObject = new Phaser.Graphics(game.realGame, require.x, require.y);
    }

    getRealObject(): Phaser.Graphics {
        return this.realObject;
    }

    destroy(): void {
        this.realObject.destroy(true);
        this.realObject = null;
    }

    set alpha(value: number) {
        this.realObject.alpha = value;
    }

    set beginFill(value: number) {
        this.realObject.beginFill(value);
    }

    set x(value: number) {
        this.realObject.x = value;
    }

    set y(value: number) {
        this.realObject.y = value;
    }

    set Rectangle (value: Rectangle) {
        this.realObject.drawShape(<any>value.getRealObject());
    }

    set inputEnabled(value: boolean) {
        this.realObject.inputEnabled = value;
    }

    set visible(value: boolean) {
        this.realObject.visible = value;
    }
}
