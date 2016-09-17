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
    _onStop: any;
    isStoped = false;

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
        if (this.list === undefined) {
            this.initList();
        }
        this.next = -1;
        this.isStoped = false;
        this.playNext();
    }

    /**
     * @param lastSoundCallBack sound task 停止时会 stop 当前正在播放的 sound， 如果此
     *          sound 有 stop 回调， 可以选择是否调用回调。 因为有时候只需要 soundTask 自身的
     *          回调。
     */
    stop(lastSoundCallBack: boolean) {
        if (this.isStoped === false) {
            this.next = undefined;
            if (Is.isPresent(this.list) && this.current >= 0) {
                this.list[this.current].stop(lastSoundCallBack);
            }
            this.isStoped = true;
            if (typeof this._onStop === 'function') {
                this._onStop();
            }
        }
    }

    set Sound(value) {
        // do nothing
    }

    set onStop(value) {
        this._onStop = value;
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
            } else {
                this.isStoped = true;
                if (typeof this._onStop === 'function') {
                    this._onStop();
                }
            }
        }
    }
}
