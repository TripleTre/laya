import display from '../../decorators/Display';
import {AbstractDisplayObject} from '../../abstract/AbstractDisplay';

@display({
  require: ['x', 'y', 'font'],
  optional: ['rtext', 'size', 'align'],
  name: 'BitmapText'
})
export default class BitmapText extends AbstractDisplayObject {
    protected realObject: Phaser.BitmapText;

    buildRealObject(game, require, optional) {
       this.realObject = new Phaser.BitmapText(game.realGame, require.x, require.y, require.font,
              optional.text && optional.text.toString(), optional.size, optional.align);
    }

    getRealObject(): Phaser.BitmapText {
        return this.realObject;
    }

    destroy() {
        this.realObject.destroy(true);
        this.realObject = null;
    }

    set text(value) {
        this.realObject.text = value.toString();
    }

    set anchorX(value) {
        this.realObject.anchor.x = value;
    }

    set anchorY(value) {
        this.realObject.anchor.y = value;
    }
}
