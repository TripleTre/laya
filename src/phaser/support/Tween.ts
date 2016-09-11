import {AbstractSupportObject} from '../../abstract/AbstractSupport';
import Game from '../display/Game';
import support from '../../decorators/Support';
import To from './To';
import Is from '../../util/Is';

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

    destroy() {
        this.tween.game.tweens.removeFrom(this.tween.target);
        this.tween = null;
        this.getChildren().forEach(v => v.destroy());
        this.getChildren().clear();
    }

    getRealObject() {
        return this.tween;
    }

    updateTo(index: number) {
        let to = <To>Array['from'](this.getChildren())[index];
        console.log('updateTo', to);
        if (Is.isPresent(to)) {
            let ease = to.easing;
            if (typeof to.easing === 'string' && this.tween.manager['easeMap'][to.easing]) {
                ease =  this.tween.manager['easeMap'][to.easing];
            }
            let toDate = new Phaser.TweenData(this.tween).to(to.properties, to.duration, ease, to.delay, to.repeat, to.yoyo);
            if (this.tween.isRunning) {
                console.warn('Phaser.Tween.to cannot be called after Tween.start');
                return;
            }
            this.tween.timeline[to.index] = toDate;
        }
    }

    set To(to: To) {
        to.setParent(this);
        to.index = this.count++;
        let ease = to.easing;
        if (typeof to.easing === 'string' && this.tween.manager['easeMap'][to.easing]) {
            ease =  this.tween.manager['easeMap'][to.easing];
        }
        let toDate = new Phaser.TweenData(this.tween).to(to.properties, to.duration, ease, to.delay, to.repeat, to.yoyo);
        if (this.tween.isRunning) {
            console.warn('Phaser.Tween.to cannot be called after Tween.start');
            return;
        }
        this.tween.timeline.push(toDate);
    }

    set start(value) {
        if (value === true && Is.isPresent(this.tween)) {
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
