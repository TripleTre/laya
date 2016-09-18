import Game from '../display/Game';
import support from '../../decorators/Support';
import {AbstractSupportObject} from '../../abstract/AbstractSupport';

@support({
    require: [],
    optional: ['frames', 'frameRate', 'loop', 'useNumericIndex'],
    name: 'Animation'
})
export default class Animation extends AbstractSupportObject {
    private realObject: Phaser.Animation;
    private frames: Array<number | string>;
    private frameRate: number;
    private loop: boolean;
    private useNumericIndex: number;

    constructor(game: Game, target: any, require: any, optional: any, id: number) {
        super(id);
        this.frames = optional.frames;
        this.frameRate = optional.frameRate;
        this.loop = optional.loop;
        this.useNumericIndex = optional.useNumericIndex;
    }

    generatData() {
        return {
            frames: this.frames,
            frameRate: this.frameRate,
            loop: this.loop,
            useNumericIndex: this.useNumericIndex
        };
    }

    setRealObject(value) {
        this.realObject = value;
    }

    destroy() {
        this.realObject = null;
    }

    play() {
        this.realObject.play();
    }
}
