import Game from '../display/Game';
import support from '../../decorators/Support';
import {AbstractSupportObject} from '../../abstract/AbstractSupport';

@support({
    require: ['key'],
    optional: ['volumn', 'loop'],
    name: 'Sound'
})
export default class Sound extends AbstractSupportObject {
    private realObject: Phaser.Sound;
    private loop: boolean;
    private _duration: number;

    constructor(game: Game, target: any, require: any, optional: any, id: number) {
        super(id);
        this.realObject = new Phaser.Sound(game.realGame, require.key, optional.volumn, optional.loop);
    }

    getRealObject(): Phaser.Sound {
        return this.realObject;
    }

    destroy() {
        this.realObject.destroy();
        this.realObject = null;
    }

    start() {
        this.realObject.play(undefined, undefined, undefined, this.loop);
        if (this.duration !== undefined) {
            setTimeout(() => {
                this.realObject.stop();
            }, this.duration);
        }
    }

    stop() {
        this.realObject.stop();
    }

    set onStart(value) {
        this.realObject.onPlay.add(value);
    }

    set onStop(value) {
        this.realObject.onStop.add(value);
    }

    set duration(value) {
        console.log(value);
        this._duration = value;
    }

    get duration(){
        return this._duration;
    }
}
