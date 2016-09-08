import {AbstractSupportObject} from '../../abstract/AbstractSupport';
import Game from '../display/Game';
import support from '../../decorators/Support';

@support({
    require: [],
    optional: []
})
export default class To extends AbstractSupportObject {
    private properties: any;
    private easing:     string;
    private delay:      number;
    private duration:   number;
    private repeat:     number;
    private yoyo:       boolean;
    private parent:     Phaser.Tween;
    private index:      number;

    constructor(game: Game, target: any, require: any, optional: any, id: number) {
        super(id);
    }

    set skip(value: boolean) {
        if (value === true) {
            this.parent.updateTweenData('duration', 100, this.index);
        }
    }

    getDelay() {
        return this.delay;
    }

    getDuration() {
        return this.duration;
    }

    getProperties() {
        return this.properties;
    }

    getEasing() {
        return this.easing;
    }

    getRepeat() {
        return this.repeat;
    }

    getYoyo() {
        return this.yoyo;
    }

    setParent(tween: Phaser.Tween) {
        this.parent = tween;
    }

    setIndex(value: number) {
        this.index = value;
    }
}
