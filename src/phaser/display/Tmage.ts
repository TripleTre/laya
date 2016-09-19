import {AbstractDisplayObject} from '../../abstract/AbstractDisplay';
import display from '../../decorators/Display';
import setUp from '../chain/SetUp';
import input from '../chain/Input';
import userInterface from '../chain/UserInterface';

@display({
    require: ['x', 'y', 'key'],
    optional: ['frame'],
    name: 'Tmage'
})
class Tmage extends AbstractDisplayObject<Phaser.Image> {
    buildRealObject(game, require, optional) {
        this.realObject = new Phaser.Image(game.realGame, require.x, require.y, require.key, optional.frame);
    }

    set key(value) {
        // console.warn('image 的 key 属性不能做绑定');
    }

    set frame(value) {
        let key: any = this.realObject.key;
        this.realObject.setFrame(this.realObject.game.cache.getFrameByName(key, value));
    }
}

setUp(Tmage.prototype, input);
setUp(Tmage.prototype, userInterface);

export default Tmage;
