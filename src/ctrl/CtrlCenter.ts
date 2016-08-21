import {createStore, combineReducers} from 'redux';
import * as Redux from 'redux/index.d.ts';
import StateManager from './StateManager';
import {AbstractSence} from '../abstract/AbstractSence';
import {Game} from '../abstract/LayaObject';
import SenceManager from './SenceManager';

export default class CtrlCenter {
    static store:    Redux.Store<any>;
    static curSence: AbstractSence;

    static initRedux(reducers: Redux.ReducersMapObject, defaultValue: any): void {
        StateManager.setLast(defaultValue);
        StateManager.setDefaultValue(defaultValue);
        let all = combineReducers(reducers);
        CtrlCenter.store = createStore(all, defaultValue,
          window['devToolsExtension'] && window['devToolsExtension']());
        CtrlCenter.store.subscribe(() => {
            StateManager.updateState(CtrlCenter.store.getState());
        });
    }
    
    static boot(game: Game, sence: string) {
        SenceManager.buildSence(sence, game);
    }

    static registerSence(sences: Array<AbstractSence>) {
        
    }
}
