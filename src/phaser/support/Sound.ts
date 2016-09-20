import Game from '../display/Game';
import support from '../../decorators/Support';
import {AbstractSupportObject} from '../../abstract/AbstractSupport';
import Is from '../../util/Is';

@support({
    require: ['key'],
    optional: ['volumn', 'loop'],
    name: 'Sound'
})
export default class Sound extends AbstractSupportObject {
    private static cache = {};
    private realObject: Phaser.Sound;
    private loop: boolean;
    private _duration: number;
    private layaStopFunc = undefined;
    private layaPlayFunc = undefined;

    constructor(game: Game, target: any, require: any, optional: any, id: number) {
        super(id);
        if (Is.isPresent(Sound.cache[require.key])) {
            this.realObject = Sound.cache[require.key];
            this.realObject.onPlay.dispose();
            this.realObject.onStop.dispose();
            this.realObject.onPlay.add(this.layaPlay, this);
            this.realObject.onStop.add(this.layaStop, this);
        } else {
            Sound.cache[require.key]
                = this.realObject
                = new Phaser.Sound(game.realGame, require.key, optional.volumn, optional.loop);
            this.realObject.onPlay.add(this.layaPlay, this);
            this.realObject.onStop.add(this.layaStop, this);
        }
    }

    layaStop() {
        if (typeof this.layaStopFunc === 'function') {
            this.layaStopFunc(this);
        }
    }

    layaPlay() {
        if (typeof this.layaPlayFunc === 'function') {
            this.layaPlayFunc(this);
        }
    }

    getRealObject(): Phaser.Sound {
        return this.realObject;
    }

    destroy() {
        // this.realObject = null;
    }

    start() {
        this.realObject.play(undefined, undefined, undefined, this.loop);
        if (this.duration !== undefined) {
            setTimeout(() => {
                if (this.realObject && this.realObject.isPlaying !== false) {
                     this.realObject.stop();
                }
            }, this.duration);
        }
    }

    stop(callBack: boolean = true) {
        if (this.realObject.isPlaying !== false) {
            if (callBack === true) {
                this.realObject.onStop.dispose();
            }
            this.realObject.stop();
        }
    }

    set onStart(value) {
        this.layaPlayFunc = value;
    }

    set onStop(value) {
        this.layaStopFunc = value;
    }

    set duration(value) {
        this._duration = value;
    }

    set key(value) {
        this.realObject.key = value;
    }

    get duration(){
        return this._duration;
    }
}
