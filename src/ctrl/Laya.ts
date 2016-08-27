import {createStore, combineReducers} from 'redux';
import * as Redux from 'redux/index.d.ts';
import StateManager from './StateManager';
import {AbstractSence, AbstractSenceConstructor} from '../abstract/AbstractSence';
import {Game} from '../abstract/LayaAbstracts';
import SenceManager from './SenceManager';
import DisplayObjectManager from './DisplayObjectManager';
import {AbstractComponentConstructor} from '../abstract/AbstractComponent';
import ComponentManager from './ComponentManager';
import Is from '../util/Is';
import ActivePropertyManager from './ActivePropertyManager';
import WatchFunctionManager from './WatchFunctionManager';
import {AbstractSupportConstructor} from '../abstract/AbstractSupport';
import SupportObjectManager from './SupportObjectManager';

export default class Laya {
    private static store:    Redux.Store<any>;
    private static curSence: AbstractSence;
    private static game:     Game;

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

    static registerSupportObject(supports: Array<AbstractSupportConstructor>): void {
        supports.forEach(value => {
            SupportObjectManager.registeSupportObject(value);
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
            if (Is.isPresent(preload)) {
                preload.apply(sence);
            }
        };
        Laya.game.registerSence(name, sence);
        Laya.game.startSence(name, clearWorld, clearCache);
        Laya.curSence = sence;
    }

    static useDisplayObject(impls: any): void {
        DisplayObjectManager.setLayaObjectImpl(impls);
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
