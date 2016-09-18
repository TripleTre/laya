import {AbstractSupportObject} from '../../abstract/AbstractSupport';
import Game from '../display/Game';
import support from '../../decorators/Support';
import To from './To';
import Is from '../../util/Is';
import ObjectManager from '../../ctrl/ObjectManager';

@support({
    require: [],
    optional: [],
    name: 'Tween'
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
    }

    getRealObject() {
        return this.tween;
    }

    updateTo(index: number) {
        if (this.tween === null) {
            return;
        }
        let to = <To>ObjectManager.getObject(this.getChildren()[index]);
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
        if (this.tween === null) {
            return;
        }
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

    start(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.tween === null) {
                console.log('tween is null');
            }
            if (Is.isPresent(this.tween)) {
                this.tween.start();
                this.tween.onComplete.addOnce(() => {
                    resolve();
                });
            }
        });
    }

    set onComplete(func: Function | Array<Function>) {
        if (this.tween === null) {
            return;
        }
        if (Array.isArray(func)) {
            func.forEach(v => this.tween.onComplete.add(v));
        } else {
             this.tween.onComplete.add(func);
        }
    }
}
