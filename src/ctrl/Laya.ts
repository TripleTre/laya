import {createStore, combineReducers} from 'redux';
import * as Redux from 'redux/index.d.ts';
import StateManager from './StateManager';
import {AbstractSence, AbstractSenceConstructor} from '../abstract/AbstractSence';
import {Game} from '../abstract/LayaObject';
import SenceManager from './SenceManager';
import DisplayObjectManager from './DisplayObjectManager';
import {AbstractComponentConstructor} from '../abstract/AbstractComponent';
import ComponentManager from './ComponentManager';

export default class Laya {
    static store:    Redux.Store<any>;
    static curSence: AbstractSence;
    static game:     Game;

    static initRedux(reducers: Redux.ReducersMapObject, defaultValue: any): void {
        StateManager.setLast(defaultValue);
        StateManager.setDefaultValue(defaultValue);
        let all = combineReducers(reducers);
        Laya.store = createStore(all, defaultValue,
          window['devToolsExtension'] && window['devToolsExtension']());
        Laya.store.subscribe(() => {
            StateManager.updateState(Laya.store.getState());
        });
    }

    static boot(game: Game, sence: string): void {
        Laya.game = game;
        // SenceManager.getAllRegisters().forEach((value) => {
        //     Laya.game.registerSence(value['name'], value);
        // });
        Laya.startSence(sence, true);
    }

    static registerSence(sences: Array<AbstractSenceConstructor>): void {
        sences.forEach((value) => {
            new value();
        });
    }

    static registerComponent(components: Array<AbstractComponentConstructor>): void {
        components.forEach(value => {
            new value();
        });
    }

    /**
     *  这很 phaser， new 出的game.world 没卵用。 setState后才可以用。
     *  所以 sence 的 build 只能放在state 的 preload里。
     */
    static startSence(name: string, clearWorld: boolean, clearCache: boolean = false): void {
        let senceCons = SenceManager.getByName(name);
        let sence     = new senceCons();
        let preload   = sence.preload;
        sence.preload = function () {
            SenceManager.buildSence(name, sence, Laya.game);
            preload.apply(sence);
        };
        Laya.game.registerSence(name, sence);
        Laya.game.startSence(name, clearWorld, clearCache);
    }

    static useDisplayObject(impls: any): void {
        DisplayObjectManager.setLayaObjectImpl(impls);
    }
}
