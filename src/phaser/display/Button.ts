import {AbstractDisplayObject} from '../../abstract/AbstractDisplay';
import display from '../../decorators/Display';
import Is from '../../util/Is';

@display({
    require: ['x', 'y', 'key'],
    optional: ['callBack', 'callBackContext', 'overFrame', 'downFrame', 'upFrame', 'disableFrame', 'outFrame'],
    name: 'Button'
})
export default class Button extends AbstractDisplayObject {
    button:       Phaser.Button;
    disableFrame: string;
    enableFrame:  string;

    buildRealObject(game, require, optional) {
        this.button = new Phaser.Button(game.realGame, require.x, require.y, require.key,
                            optional.callBack, optional.callBackContext, optional.overFrame,
                            optional.outFrame, optional.downFrame, optional.upFrame);
        this.disableFrame = optional.disableFrame;
        this.enableFrame  = optional.enableFrame;
    }

    getRealObject(): Phaser.Button {
        return this.button;
    }

    destroy() {
        this.button.destroy(true);
        this.button = null;
    }

    set scaleX(value) {
        this.button.scale.x = value;
    }

    set scaleY(value) {
        this.button.scale.y = value;
    }

    set visible(value: boolean) {
        this.button.visible = value;
    }

    set enable(value: boolean) {
        this.button.inputEnabled = value;
        // phaser button 自己的 setStateFrame 后执行， 因此延迟
        setTimeout(() => {
            if (Is.isAbsent(this.button)) {
                return;
            }
            if (value === false) {
                this.button['frameName'] = this.disableFrame;
            } else {
                this.button['frameName'] = this.enableFrame;
            }
        });
    }

    set anchorX (value) {
        this.button.anchor.x = value;
    }

    set anchorY (value) {
        this.button.anchor.y = value;
    }

    set DownSound(value) {
        this.button.onDownSound = value.getRealObject();
    }

    set frame(value) {
        let key: any = this.button.key;
        this.button.setFrame(this.button.game.cache.getFrameByName(key, value));
    }
}
