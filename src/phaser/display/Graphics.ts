import {AbstractDisplayObject} from '../../abstract/AbstractDisplay';
import display from '../../decorators/Display';
import Rectangle from '../support/Rectangle';
import setUp from '../chain/SetUp';
import userInterface from '../chain/UserInterface';

@display({
    require: ['x', 'y'],
    name: 'Graphics'
})
export default class Graphics extends AbstractDisplayObject<Phaser.Graphics> {

    buildRealObject(game, require, optional) {
        this.realObject = new Phaser.Graphics(game.realGame, require.x, require.y);
    }

    set beginFill(value: number) {
        this.realObject.beginFill(value);
    }

    set Rectangle (value: Rectangle) {
        this.realObject.drawShape(<any>value.getRealObject());
    }

    set inputEnabled(value: boolean) {
        this.realObject.inputEnabled = value;
    }
}

setUp(Graphics.prototype, userInterface);
