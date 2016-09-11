import {AbstractSupportObject} from '../../abstract/AbstractSupport';
import Game from '../display/Game';
import support from '../../decorators/Support';
import Tween from './Tween';
import Is from '../../util/Is';

@support({
    require: [],
    optional: [],
    name: 'To'
})
export default class To extends AbstractSupportObject {
    index: number = 0;
    private _properties: any = {};
    private _easing: any = 'Sine.easeInOut';
    private _delay: number = 0;
    private _duration: number = 1000;
    private _repeat: number = 0;
    private _yoyo: boolean = false;
    private parent: Tween;

    constructor(game: Game, target: any, require: any, optional: any, id: number) {
        super(id);
    }

    destroy() {
        // this.getChildren().clear();
    }

    forceSkip() {
        let tween = this.parent.getRealObject();
        if (Is.isPresent(tween)) {
            tween.updateTweenData('duration', 100, this.index);
        }
    }

    set skip(value: boolean) {
        if (value === true && Is.isPresent(this.parent)) {
            let tween = this.parent.getRealObject();
            if (Is.isPresent(tween)) {
                tween.updateTweenData('duration', 100, this.index);
            }
        }
    }

    set properties(value) {
        this._properties = value;
        if (Is.isPresent(this.parent)) {
            this.parent.updateTo(this.index);
        }
    }

    get properties() {
        return this._properties;
    }

    set delay(value) {
        this._delay = value;
        if (Is.isPresent(this.parent)) {
            this.parent.updateTo(this.index);
        }
    }

    get delay() {
        return this._delay;
    }

    set duration(value) {
        this._duration = value;
        if (Is.isPresent(this.parent)) {
            this.parent.updateTo(this.index);
        }
    }

    get duration() {
        return this._duration;
    }

    set easing(value) {
        this._easing = value;
        if (Is.isPresent(this.parent)) {
            this.parent.updateTo(this.index);
        }
    }

    get easing() {
        return this._easing;
    }

    set repeat(value) {
        this._repeat = value;
        if (Is.isPresent(this.parent)) {
            this.parent.updateTo(this.index);
        }
    }

    get repeat() {
        return this._repeat;
    }

    set yoyo(value) {
        this._yoyo = value;
        if (Is.isPresent(this.parent)) {
            this.parent.updateTo(this.index);
        }
    }

    get yoyo() {
        return this._yoyo;
    }

    setParent(tween: Tween) {
        this.parent = tween;
    }
}
