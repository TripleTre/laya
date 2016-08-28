import Game from '../display/Game';
import support from '../../decorators/Support';
import Is from '../../util/Is';
import {AbstractSupportObject} from '../../abstract/AbstractSupport';

@support({
    require: [],
    optional: ['x', 'y', 'width', 'height']
})
export default class Rectangle extends AbstractSupportObject {
    rectangle: Phaser.Rectangle;

    constructor(game: Game, require: any, optional: any) {
        super();
        this.rectangle = new Phaser.Rectangle(optional.x, optional.y, optional.width, optional.height);
    }

    getRealObject(): Phaser.Rectangle {
        return this.rectangle;
    }

    set x(value: number) {
        this.rectangle.x = value;
    }

    set y(value: number) {
        this.rectangle.y = value;
    }

    set width(value: number) {
        this.rectangle.width = value;
    }

    set height(value: number) {
        this.rectangle.height = value;
    }
}