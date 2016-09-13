import Game from '../display/Game';
import support from '../../decorators/Support';
import {AbstractSupportObject} from '../../abstract/AbstractSupport';
import Sound from './Sound';
import Is from '../../util/Is';
import ObjectManager from '../../ctrl/ObjectManager';

@support({
    require: [],
    optional: [],
    name: 'SoundTask'
})
export default class SoundTask extends AbstractSupportObject {
    current: number = -1;
    next: number;
    list: Array<Sound>;

    constructor(game: Game, target: any, require: any, optional: any, id: number) {
        super(id);
    }

    getRealObject(): any {
        return 'custome support object, has no realObject';
    }

    destroy() {
        // this.getChildren().clear();
    }

    play() {
        this.start = true;
    }

    set start(value) {
        if (value === true) {
            if (this.list === undefined) {
                this.initList();
            }
            this.next = -1;
            this.playNext();
        }
    }

    set stop(value) {
        if (value === true) {
            this.next = undefined;
            this.list[this.current].stop();
        }
    }

    set Sound(value) {
        // do nothing
    }

    set onStop(value) {
        if (Is.isPresent(this.list) && this.list.length > 0) {
            this.list[this.list.length - 1].onStop = value;
        }
    }

    initList() {
        this.list = this.getChildren().map(v => ObjectManager.getObject<Sound>(v));
        this.list.forEach(v => {
            v.getRealObject().onStop.add((() => {
                this.playNext();
            }).bind(this));
        });
    }

    playNext() {
        if (this.next !== undefined) {
            this.next++;
            this.current = this.next;
            let next = this.list[this.next];
            if (Is.isPresent(next)) {
                next.start();
            }
        }
    }
}
