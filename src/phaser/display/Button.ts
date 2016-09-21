import {AbstractDisplayObject} from '../../abstract/AbstractDisplay';
import display from '../../decorators/Display';
import Is from '../../util/Is';
import setUp from '../chain/SetUp';
import userInterface from '../chain/UserInterface';
import input from '../chain/Input';

@display({
    require: ['x', 'y'],
    optional: ['callBack', 'callBackContext', 'overFrame', 'downFrame', 'upFrame', 'disableFrame', 'outFrame', 'key'],
    name: 'Button'
})
export default class Button extends AbstractDisplayObject<Phaser.Button> {
    realObject:   Phaser.Button;
    disableFrame: string;
    enableFrame:  string;

    buildRealObject(game, require, optional) {
        this.realObject = new Phaser.Button(game.realGame, require.x, require.y, optional.key,
                            optional.callBack, optional.callBackContext, optional.overFrame,
                            optional.outFrame, optional.downFrame, optional.upFrame);
        this.disableFrame = optional.disableFrame;
        this.enableFrame  = optional.enableFrame;
    }

    set enable(value: boolean) {
        this.realObject.inputEnabled = value;
        // phaser button 自己的 setStateFrame 后执行， 因此延迟
        setTimeout(() => {
            if (Is.isAbsent(this.realObject)) {
                return;
            }
            if (value === false) {
                this.realObject['frameName'] = this.disableFrame;
            } else {
                this.realObject['frameName'] = this.enableFrame;
            }
        });
    }

    set DownSound(value) {
        this.realObject.onDownSound = value.getRealObject();
    }

    set frame(value) {
        let key: any = this.realObject.key;
        this.realObject.setFrame(this.realObject.game.cache.getFrameByName(key, value));
    }
}

setUp(Button.prototype, input);
setUp(Button.prototype, userInterface);
