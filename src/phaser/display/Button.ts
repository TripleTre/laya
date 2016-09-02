import {AbstractDisplayObject} from '../../abstract/AbstractDisplay';
import display from '../../decorators/Display';

@display({
    require: ['x', 'y', 'key', 'outFrame'],
    optional: ['callBack', 'callBackContext', 'overFrame', 'downFrame', 'upFrame', 'disableFrame']
})
export default class Button extends AbstractDisplayObject {
    button:       Phaser.Button;
    disableFrame: string;
    enableFrame:  string;

    // constructor(game: Game, require: any, optional: any, id: number) {
    //     super(id);
    //     this.button = new Phaser.Button(game.realGame, require.x, require.y, require.key,
    //                         optional.callBack, optional.callBackContext, optional.overFrame,
    //                         require.outFrame, optional.downFrame, optional.upFrame);
    //     this.disableFrame = optional.disableFrame;
    //     this.enableFrame  = optional.enableFrame;
    // }

    buildRealObject(game, require, optional) {
        this.button = new Phaser.Button(game.realGame, require.x, require.y, require.key,
                            optional.callBack, optional.callBackContext, optional.overFrame,
                            require.outFrame, optional.downFrame, optional.upFrame);
        this.disableFrame = optional.disableFrame;
        this.enableFrame  = optional.enableFrame;
    }

    getRealObject(): Phaser.Button {
        return this.button;
    }

    destroy() {
        this.button.destroy();
    }

    set visible(value: boolean) {
        this.button.visible = value;
    }

    set enable(value: boolean) {
        this.button.inputEnabled = value;
        // phaser button 自己的 setStateFrame 后执行， 因此延迟
        setTimeout(() => {
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
}
