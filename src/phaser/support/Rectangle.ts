import Game from '../display/Game';
import support from '../../decorators/Support';
import {AbstractSupportObject} from '../../abstract/AbstractSupport';

@support({
    require: [],
    optional: ['x', 'y', 'width', 'height'],
    name: 'Rectangle'
})
export default class Rectangle extends AbstractSupportObject {
    rectangle: Phaser.Rectangle;

    constructor(game: Game, target: any, require: any, optional: any, id: number) {
        super(id);
        this.rectangle = new Phaser.Rectangle(optional.x, optional.y, optional.width, optional.height);
    }

    destroy() {
        this.rectangle = null;
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
