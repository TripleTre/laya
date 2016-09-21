import {AbstractDisplayObject} from '../../abstract/AbstractDisplay';
import display from '../../decorators/Display';
import setUp from '../chain/SetUp';
import userInterface from '../chain/UserInterface';

@display({
    require: ['x', 'y', 'key'],
    optional: ['frame'],
    name: 'Sprite'
})
class Tmage extends AbstractDisplayObject<Phaser.Sprite> {

    buildRealObject(game, require, optional) {
        this.realObject = new Phaser.Sprite(game.realGame, require.x, require.y, require.key, optional.frame);
    }

    set key(value) {
        // console.warn('sprite 的 key 属性不能做绑定');
    }

    set frame(value) {
        let key: any = this.realObject.key;
        this.realObject.setFrame(this.realObject.game.cache.getFrameByName(key, value));
    }

    set Animation(value) {
        let data = value.generatData();
        let name = Date.now().toString(16);
        let real = this.realObject.animations.add(name, data.frames, data.frameRate, data.loop, data.useNumericIndex);
        value.setRealObject(real);
    }
}

setUp(Tmage, userInterface);
export default Tmage;
