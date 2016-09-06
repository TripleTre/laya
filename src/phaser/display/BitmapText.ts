import display from '../../decorators/Display';
import {AbstractDisplayObject} from '../../abstract/AbstractDisplay';

@display({
  require: ['x', 'y', 'font'],
  optional: ['text', 'size', 'align']
})
export default class BitmapText extends AbstractDisplayObject {
    private realObject: Phaser.BitmapText;

    buildRealObject(game, require, optional) {
       this.realObject = new Phaser.BitmapText(game.realGame, require.x, require.y, require.font,
              optional.text, optional.size, optional.align);
    }

    getRealObject(): Phaser.BitmapText {
        return this.realObject;
    }

    destroy() {
        this.realObject.destroy(true);
    }

    set text(value) {
        this.realObject.text = value;
    }

    set anchorX(value) {
        this.realObject.anchor.x = value;
    }

    set anchorY(value) {
        this.realObject.anchor.y = value;
    }
}
