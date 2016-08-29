import {createStore, combineReducers} from 'redux';
import * as Redux from 'redux/index.d.ts';
import StateManager from './StateManager';
import {AbstractSence, AbstractSenceConstructor} from '../abstract/AbstractSence';
import {LayaGame} from '../abstract/LayaInterface';
import SenceManager from './SenceManager';
import DisplayObjectManager from './DisplayObjectManager';
import {AbstractComponentConstructor} from '../abstract/AbstractComponent';
import ComponentManager from './ComponentManager';
import Is from '../util/Is';
import ActivePropertyManager from './ActivePropertyManager';
import WatchFunctionManager from './WatchFunctionManager';
import {AbstractSupportObjectConstructor} from '../abstract/AbstractSupport';
import {AbstractDisplayObjectConstructor} from '../abstract/AbstractDisplay';
import SupportObjectManager from './SupportObjectManager';
import World from '../phaser/display/World';

export default class Laya {
    private static store:    Redux.Store<any>;
    private static curSence: AbstractSence;
    private static game:     LayaGame;

    static initRedux(reducers: any, defaultValue: any): void {
        StateManager.setLast(defaultValue);
        StateManager.setDefaultValue(defaultValue);
        let all = combineReducers(reducers);
        Laya.store = createStore(all, defaultValue,
          window['devToolsExtension'] && window['devToolsExtension']());
        Laya.store.subscribe(() => {
            StateManager.updateState(Laya.store.getState());
        });
    }

    static boot(game: LayaGame, senceName: string): void {
        Laya.game = game;
        let world = new World();
        Laya.game.setWorld(world);
        DisplayObjectManager.addInstance(world);
        let senceCons = SenceManager.getByName(senceName);
        let sence     = new senceCons();
        let preload   = sence['preload'];
        sence['preload'] = function () {
            world.setWorld(this.game.world);
            sence.setLayaGame(Laya.game);
            SenceManager.buildSence(senceName, sence, Laya.game);
            if (Is.isPresent(preload)) {
                preload.apply(sence);
            }
        };
        Laya.game.registerSence(senceName, sence);
        Laya.game.startSence(senceName, true, false);
        Laya.curSence = sence;
    }

    static registerSence(sences: Array<AbstractSenceConstructor>): void {
        //
    }

    static registerComponent(components: Array<AbstractComponentConstructor>): void {
        //
    }

    static registerSupportObject(supports: any): void {
        supports.forEach(value => {
            SupportObjectManager.registerSupportObject(value);
        });
    }

    static registerDisplayObject(displays: any): void {
        displays.forEach(value => {
            DisplayObjectManager.registerDisplayObject(value);
        });
    }

    /**
     *  这很 phaser， new 出的game.world 没卵用。 setState后才可以用。
     *  所以 sence 的 build 只能放在state 的 preload里。
     */
    static startSence(name: string, clearWorld: boolean, clearCache: boolean = false): void {
        let senceCons = SenceManager.getByName(name);
        let sence     = new senceCons();
        let preload   = sence['preload'];
        sence['preload'] = function () {
            sence.setLayaGame(Laya.game);
            SenceManager.buildSence(name, sence, Laya.game);
            if (Is.isPresent(preload)) {
                preload.apply(sence);
            }
        };
        Laya.game.registerSence(name, sence);
        Laya.game.startSence(name, clearWorld, clearCache);
        Laya.curSence = sence;
    }

    /**
     *  清楚组件注册信息
     */
    static cancelComponent(name: string): void {
        ComponentManager.cancelComponent(name);
        ActivePropertyManager.cancelRegistData(name);
        WatchFunctionManager.deleteWatchs(name);
    }

    static rebuildSence(): void {
        let curSence = Laya.curSence;
        curSence.destorySubComponent();
        let name = curSence.constructor['name'];
        SenceManager.buildSence(name, curSence, Laya.game);
    }

    static dispatch(action: {type: any, value: any}): void {
        Laya.store.dispatch(action);
    }
}
