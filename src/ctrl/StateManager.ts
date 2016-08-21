import Application from '../ctrl/Application';
import * as Iter from '../util/Iter';
import equal from '../util/DeepEqual';
import Is from '../util/Is';
import ComponentManager from './ComponentManager';
import ViewModelManager from './ViewModelManager';
import {Getter} from './DirectiveManager';

export default class StateManager {
    private static default:      any;
    private static last:         any;
    private static getters:      Map<Getter, Set<number>> = new Map<Getter, Set<number>>();
    private static forceGetters:  Map<Getter, Set<number>> = new Map<Getter, Set<number>>();

    static addToGetters(getter: Getter, id: number): void {
        if (Is.isAbsent(StateManager.getters.get(getter))) {
            StateManager.getters.set(getter, new Set<number>());
        }
        StateManager.getters.get(getter).add(id);
    }

    static addToForce(getter: Getter, id: number): void {
        if (Is.isAbsent(StateManager.forceGetters.get(getter))) {
            StateManager.forceGetters.set(getter, new Set<number>());
        }
        StateManager.forceGetters.get(getter).add(id);
    }

    static delete(id: number): void {
        ['getters', 'forceGetters'].forEach((type) => {
            let keys = StateManager[type].keys();
            Iter.forEachKey<Function>(keys, (getter: Function) => {
                let sets = StateManager[type].get(getter);
                sets.delete(id);
                if (sets.size === 0) {
                    StateManager[type].delete(getter);
                }
            });
        });
    }

    static updateState(state: any): void {
        let forces = StateManager.forceGetters.keys();
        Iter.forEachKey<Getter>(forces, (getter: Getter) => {
            let componentIds = StateManager.forceGetters.get(getter);
            componentIds.forEach(v => {
                let cpt = ComponentManager.getInstance(v);
                let val = getter.getter(state, cpt);
                let cptName = cpt.constructor['name'];
                ViewModelManager.activePropertyForComponent(cpt, cpt.getGetterProperty(getter), val);
            });
        });
        let normals = StateManager.getters.keys();
        Iter.forEachKey<Getter>(normals, (getter: Getter) => {
            let componentIds = StateManager.getters.get(getter);
            componentIds.forEach(v => {
                let cpt = ComponentManager.getInstance(v);
                let val = getter.getter(state, cpt);
                if (!equal(val, getter.getter(StateManager.last, cpt))) {
                    let cptName = cpt.constructor['name'];
                    ViewModelManager.activePropertyForComponent(cpt, cpt.getGetterProperty(getter), val);
                }
            });
        });
        StateManager.last = state;
    }

    static setLast(value) {
        StateManager.last = value;
    }

    static getDefaultValue(): any {
        return StateManager.default;
    }

    static setDefaultValue(value: any): void {
        StateManager.default = value;
    }
}

window['_StateManager'] = StateManager;
