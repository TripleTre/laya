import display from '../../decorators/Display';
import {AbstractDisplayObject} from '../../abstract/AbstractDisplay';
import setUp from '../chain/SetUp';
import userInterface from '../chain/UserInterface';

@display({
  require: ['x', 'y', 'font'],
  optional: ['rtext', 'size', 'align'],
  name: 'BitmapText'
})
export default class BitmapText extends AbstractDisplayObject<Phaser.BitmapText> {
    buildRealObject(game, require, optional) {
       this.realObject = new Phaser.BitmapText(game.realGame, require.x, require.y, require.font,
              optional.text && optional.text.toString(), optional.size, optional.align);
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

setUp(BitmapText.prototype, userInterface);
