import {AbstractSence, AbstractSenceConstructor} from '../abstract/AbstractSence';
import {ComponentNode} from './ComponentManager';
import ComponentManager from './ComponentManager';
import {Getter} from './DirectiveManager';
import ViewModelManager from './ViewModelManager';
import {ActiveProperties} from './ActivePropertyManager';
import ActivePropertyManager from './ActivePropertyManager';
import DisplayObjectManager from './DisplayObjectManager';
import {LayaGame} from '../abstract/LayaInterface';
import WatchFunctionManager from './WatchFunctionManager';

interface NamedSenceData {
    node:             ComponentNode;
    newFunc:          AbstractSenceConstructor;
}

export default class SenceManager {
    private static registers: Map<string, NamedSenceData>         = new Map<string, NamedSenceData>();
    private static instances: Map<number, AbstractSence>          = new Map<number, AbstractSence>();

    static reigsterSence(newFunc: AbstractSenceConstructor, cptNode: ComponentNode) {
        let name: string  = newFunc['name'];
        let activeProperties: ActiveProperties = {
                                         data:   new Set<string>(),
                                         getter: new Set<Getter>()
                                     };
        SenceManager.registers.set(name, {
            node:    cptNode,
            newFunc: newFunc
        });
        ActivePropertyManager.initActiveProperty(name, activeProperties);
        ActivePropertyManager.doWaiteExecute(name);
    }

    static buildSence(name: string, build: AbstractSence, game: LayaGame, rebuild: boolean = false): AbstractSence {
        let registe = SenceManager.registers.get(name);
        let node    = registe.node;
        SenceManager.instances.set(build.getId(), build);
        if (rebuild === false) {
            ViewModelManager.initSenceViewModel(build, ActivePropertyManager.getActiveProperties(name));
        }
        WatchFunctionManager.getWatchs(name).forEach(({property, func}) => {
            if (rebuild === false) {
                ViewModelManager.addDependences(build.getId(), property, build[func].bind(build));
            }
            build[func].bind(build)(); // 根据现有 viewModel 重新build sence的时候
        });
        node.children.forEach(v => {
            let name = v.name;
            if (ComponentManager.hasComponent(name)) {
                let c = ComponentManager.buildComponent(build, v, build.getLayaGame().getWorld(), build.getLayaGame());
                build.addSubComponent(c);
            } else {
                let ct = build.getLayaGame().getWorld();
                ct.add(DisplayObjectManager.buildDisplayObject(build, v, build.getLayaGame(), <any>ct));
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
        return SenceManager.instances.get(id);
    }
}

window['_SenceManager'] = SenceManager;
