import Game from '../display/Game';
import support from '../../decorators/Support';
import {AbstractSupportObject} from '../../abstract/AbstractSupport';

@support({
    require: ['key'],
    optional: ['volumn', 'loop']
})
export default class Sound extends AbstractSupportObject {
    realObject: Phaser.Sound;

    constructor(game: Game, target: any, require: any, optional: any, id: number) {
        super(id);
        this.realObject = new Phaser.Sound(game.realGame, require.key, optional.volumn, optional.loop);
    }

    getRealObject(): Phaser.Sound {
        return this.realObject;
    }

    start() {
        this.realObject.play();
    }

    stop() {
        this.realObject.stop();
    }
}
