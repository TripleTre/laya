import {AbstractSupportObject} from '../../abstract/AbstractSupport';
import Game from '../display/Game';
import support from '../../decorators/Support';
import To from './To';

@support({
    require: [],
    optional: []
})
export default class Tween extends AbstractSupportObject {
    private tween: Phaser.Tween;
    private count: number = 0;

    constructor(game: Game, target: any, require: any, optional: any, id: number) {
        super(id);
        let realObj = target.getRealObject();
        this.tween = new Phaser.Tween(realObj, realObj.game, realObj.game.tweens);
    }

    set To(to: To) {
        to.setParent(this.tween);
        to.setIndex(this.count++);
        this.tween.to(to.getProperties(), to.getDuration(), to.getEasing(), false, to.getDelay(), to.getRepeat(), to.getYoyo());
    }

    set start(value) {
        if (value === true) {
            this.tween.start();
        }
    }

    set onComplete(func: Function | Array<Function>) {
        if (Array.isArray(func)) {
            func.forEach(v => this.tween.onComplete.add(v));
        } else {
             this.tween.onComplete.add(func);
        }
    }
}
