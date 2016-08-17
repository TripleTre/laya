import Application from '../ctrl/Application';
import * as Iter from '../util/Iter';
import equal from '../util/DeepEqual';
import Is from '../util/Is';

export default class StateManager {
    private static last: any;
    private static getters: Map<Function, Set<number>> = new Map<Function, Set<number>>();
    private static forceGetters: Map<Function, Set<number>> = new Map<Function, Set<number>>();

    static addToGetters(getter: Function, id: number): void {
        if (Is.isAbsent(StateManager.getters.get(getter))) {
            StateManager.getters.set(getter, new Set<number>());
        }
        StateManager.getters.get(getter).add(id);
    }

    static addToForce(getter: Function, id: number): void {
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

    static updateState(state: any, app: Application): void {
        let forces = StateManager.forceGetters.keys();
        Iter.forEachKey<Function>(forces, (getter: Function) => {
            let componentIds = StateManager.forceGetters.get(getter);
            componentIds.forEach(v => {
                let cpt = app.getComponent(v);
                let val = getter(state, cpt);
                let cptName = cpt.constructor['name'];
                app.activePropOrGetter(cptName, cpt, cpt.getterAttribute(getter), val);
            });
        });
        let normals = StateManager.getters.keys();
        Iter.forEachKey<Function>(normals, (getter: Function) => {
            let componentIds = StateManager.getters.get(getter);
            componentIds.forEach(v => {
                let cpt = app.getComponent(v);
                let val = getter(state, cpt);
                if (!equal(val, getter(StateManager.last, cpt))) {
                    let cptName = cpt.constructor['name'];
                    app.activePropOrGetter(cptName, cpt, cpt.getterAttribute(getter), val);
                }
            });
        });
        StateManager.last = state;
    }

    static setLast(value) {
        StateManager.last = value;
    }
}

window['_StateManager'] = StateManager;
