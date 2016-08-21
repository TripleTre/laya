import {AbstractSence, AbstractSenceConstructor} from '../abstract/AbstractSence';
import {ComponentNode} from './ComponentManager';
import ComponentManager from './ComponentManager';
import {Getter} from './DirectiveManager';
import counter from './Counter';
import ViewModelManager from './ViewModelManager';
import {ActiveProperties} from './ActivePropertyManager';
import ActivePropertyManager from './ActivePropertyManager';
import DisplayObjectManager from './DisplayObjectManager';
import {Game} from '../abstract/LayaObject';

interface NamedSenceData {
    node:             ComponentNode;
    newFunc:          AbstractSenceConstructor;
}

export default class SenceManager {
    private static registers: Map<string, NamedSenceData>         = new Map<string, NamedSenceData>();
    private static instances: Map<number, AbstractSence>          = new Map<number, AbstractSence>();

    static reigsterSence(newFunc: AbstractSenceConstructor, cptNode: ComponentNode) {
        let name: string  = newFunc.constructor.name;
        let activeProperties: ActiveProperties = {
                                         data:   new Set<string>(),
                                         getter: new Set<Getter>()
                                     }
        SenceManager.registers.set(name, {
            node:             cptNode,
            newFunc:          newFunc
        });
        ActivePropertyManager.initActiveProperty(name, activeProperties);
    }

    static buildSence(name: string, game: Game) {
        let registe = SenceManager.registers.get(name);
        let newFunc = registe.newFunc;
        let node    = registe.node;
        let build   = new newFunc();
        build['id'] = counter();
        build.setGame(game);
        SenceManager.instances.set(build['id'], build);
        ViewModelManager.initSenceViewModel(build, ActivePropertyManager.getActiveProperties(name));
        
        node.children.forEach(v => {
            let name = v.name;
            if (ComponentManager.hasComponent(name)) {
                let c = ComponentManager.buildComponent(build, v, build.getWorld(), build.getGame());
                build.addSubComponent(c);
            } else {
                build.getWorld().add(DisplayObjectManager.buildDisplayObject(build, v, build.getGame()));
            }
        });
    }
}
