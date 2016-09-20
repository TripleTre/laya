import display from '../../decorators/Display';
import {AbstractDisplayObject} from '../../abstract/AbstractDisplay';
import setUp from '../chain/SetUp';
import userInterface from '../chain/UserInterface';

@display({
  require: ['x', 'y', 'text'],
  optional: ['style'],
  name: 'LayaText'
})
export default class LayaText extends AbstractDisplayObject<Phaser.Text> {
    buildRealObject(game, require, optional) {
       this.realObject = new Phaser.Text(game.realGame, require.x, require.y, require.text, optional.style);
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

setUp(LayaText.prototype, userInterface);
