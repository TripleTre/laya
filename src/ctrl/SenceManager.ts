import {AbstractSence, AbstractSenceConstructor} from '../abstract/AbstractSence';
import {ComponentNode} from './ComponentManager';
import ComponentManager from './ComponentManager';
import {Getter} from './DirectiveManager';
import ViewModelManager from './ViewModelManager';
import DisplayObjectManager from './DisplayObjectManager';
import {LayaGame} from '../abstract/LayaInterface';
import ObjectManager from './ObjectManager';

interface NamedSenceData {
    node:             ComponentNode;
    newFunc:          AbstractSenceConstructor;
}

export interface ActiveProperties {
    data:   Set<string>;
    prop?:  Set<string>;
    getter: Set<Getter>;
}

export default class SenceManager {
    private static registers: Map<string, NamedSenceData>         = new Map<string, NamedSenceData>();

    static reigsterSence(name: string, newFunc: AbstractSenceConstructor, cptNode: ComponentNode) {
        SenceManager.registers.set(name, {
            node:    cptNode,
            newFunc: newFunc
        });
    }

    static buildSence(name: string, build: AbstractSence, game: LayaGame, rebuild: boolean = false): AbstractSence {
        build.setRootContainer(build.getLayaGame().getWorld());
        let registe = SenceManager.registers.get(name);
        let node    = registe.node;
        ObjectManager.setObject(build.getId(), build);
        if (rebuild === false) {
            ViewModelManager.initSenceViewModel(build);
        }
        if (build.constructor['$$watch']) {
            build.constructor['$$watch'].forEach(({propertyName, propertyKey}) => {
                if (rebuild === false) {
                    ViewModelManager.addDependences(build.getId(), propertyName, build[propertyKey].bind(build));
                }
                build[propertyKey].bind(build)(); // 根据现有 viewModel 重新build sence的时候
            });
        }
        node.children.forEach(v => {
            let name = v.name;
            if (ComponentManager.hasComponent(name)) {
                let c = ComponentManager.buildComponent(build, v, build.getLayaGame().getWorld(), build.getLayaGame());
                build.addSubComponent(c);
            } else {
                let ct = build.getLayaGame().getWorld();
                ct.add(DisplayObjectManager.buildDisplayObject(build, v, game.getWorld()));
            }
        });
        return build;
    }

    static getAllRegisters(): Array<AbstractSenceConstructor> {
        let ret = [];
        SenceManager.registers.forEach(v => {
            ret.push(v.newFunc);
        });
        return ret;
    }

    static getByName(name: string): AbstractSenceConstructor {
        return SenceManager.registers.get(name).newFunc;
    }

    static getInstance(id: number) {
        return ObjectManager.getObject(id);
    }
}

window['_SenceManager'] = SenceManager;
