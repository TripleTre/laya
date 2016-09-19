import * as Iter from '../util/Iter';
import Is from '../util/Is';
import ViewModelManager from './ViewModelManager';
import {Getter} from './DirectiveManager';
import diff from '../util/Diff';
import ObjectManager from './ObjectManager';

export default class StateManager {
    private static last: any;
    private static getters: Map<String, Array<{id: number, propertyName: string}>> = new Map<String, Array<{id: number, propertyName: string}>>();

    static addToGetters(getter: Getter, id: number): void {
        if (Is.isAbsent(StateManager.getters.get(getter.path))) {
            StateManager.getters.set(getter.path, []);
        }
        StateManager.getters.get(getter.path).push({
            id,
            propertyName: getter.name
        });
    }

    static delete(id: number): void {
        let keys = StateManager.getters.keys();
        Iter.forEachKey<string>(keys, (v) => {
            let cur = StateManager.getters.get(v);
            StateManager.getters.set(v, cur.filter(v => v.id !== id));
        });
    }

    static updateState(state: any): void {
        let result = diff(state, [], state, StateManager.last, []);
        StateManager.last = state;
        result.forEach(result => {
            let fullObersvers = StateManager.getFullObersver(result.path);
            fullObersvers.forEach(path => {
                let changes = StateManager.getters.get(path);
                if (Is.isPresent(changes)) {
                    changes.forEach(v => {
                        if (ObjectManager.hasObject(v.id)) {
                            ViewModelManager.activePropertyForComponent(v.id, v.propertyName, result.newVal);
                        }
                    });
                }
            });
        });
    }

    static setLast(value) {
        StateManager.last = value;
    }

    static getFullObersver(path: string) {
        let list = path.split('.');
        let ret = [];
        list.reduce((cur, val) => {
            let subPath = (cur + '.' + val).replace(/^\./, '');
            ret.push(subPath);
            return subPath;
        }, '');
        return ret;
    }
}

window['_StateManager'] = StateManager;
