import {AbstractComponentConstructor, AbstractComponent} from '../abstract/AbstractComponent';
import {AbstractSence} from '../abstract/AbstractSence';
import {Container, DisplayObject, Game} from '../abstract/LayaObject';
import counter from './Counter';
import {ActiveProperties} from './ActivePropertyManager';
import ActivePropertyManager from './ActivePropertyManager';
import {Getter, ParsedDirective} from './DirectiveManager';
import DirectiveManager from './DirectiveManager';
import ViewModelManager from './ViewModelManager';
import {parseDirective} from '../parser/Template';
import {expToFunction} from '../parser/Expression';
import Is from '../util/Is';
import DisplayObjectManager from './DisplayObjectManager';
import {forEachKey} from '../util/Iter';
import {remove} from '../util/Array';

export interface ComponentNode {
    name:       string;
    normals:    Array<{name: string, value: (context) => any}>;
    directives: Array<ParsedDirective>;
    children:   Array<ComponentNode>;
}

export interface NamedComponetData {
    node:      ComponentNode;
    newFunc:   AbstractComponentConstructor;
    viewModel: ActiveProperties;
}

export default class ComponentManager {
    private static registed:  Set<string>                    = new Set<string>();
    private static registers: Map<string, NamedComponetData> = new Map<string, NamedComponetData>();
    private static instances: Map<number, AbstractComponent> = new Map<number, AbstractComponent>();
    private static nameIdMap: Map<string, Array<number>>     = new Map<string, Array<number>>();

    static registerComponent(newFunc: AbstractComponentConstructor, cptNode: ComponentNode) {
        let name:   string         = newFunc['name'];
        let dpg:    ActiveProperties = {
                                         data:   new Set<string>(),
                                         prop:   new Set<string>(),
                                         getter: new Set<Getter>()
                                     };
        ComponentManager.registers.set(name, {
            node:      cptNode,
            newFunc:   newFunc,
            viewModel: dpg
        });
        ComponentManager.nameIdMap.set(name, []);
        ComponentManager.registed.add(name);
        ActivePropertyManager.initActiveProperty(name, dpg);
        ActivePropertyManager.doWaiteExecute(name);
    }

    /**
     * @param own  组件的上级， 可能是另一个组件或者是一个场景对象
     * @param node 以组件名为名的标签上的解析结果，比如： <spin attr="attr" />， attr 属性就在 node.normals 里面
     *                 而组件的实现中标签的解析结果， 需从 componentTreeMap 中取出。
     * @param container 父级容器
     */
    static buildComponent(own: AbstractComponent | AbstractSence, node: ComponentNode,
                          container: Container<DisplayObject>, game: Game): AbstractComponent {
        let name    = node.name;
        let registe = this.registers.get(name);
        let subNode = registe.node;
        let newFunc = registe.newFunc;

        let build = new newFunc();
        build.setId(counter());
        // 设置 component prop 属性的默认值
        node.normals.forEach(({name: attrName, value: attrVal}) => {
            let parsedName = attrName.replace(/\-([a-z])/g, (a: string, b: string) => {
                        return b.toUpperCase();
            });
            build[parsedName] = attrVal(own);
        });
        node.directives.forEach(({name, argument, value, triggers}) => {
            build[argument] = value(own);
            DirectiveManager.getDirective(name).bind(own, build, argument, value, triggers);
        });
        let id = build.getId();
        this.instances.set(id, build);
        this.nameIdMap.get(name).push(id);
        let activeProperties = ActivePropertyManager.getActiveProperties(name);
        ViewModelManager.initComponentViewModel(build, activeProperties);
        // 构建组件的具体实现
        let implement = DisplayObjectManager.buildDisplayObject(build, registe.node, game);
        build.setRootContainer(<any>implement);
        container.add(implement);
        node.children.forEach(v => {
            // todo
            new Error('这个node暂时不可能有children的, 明天再来处理, children在subContainer就处理了');
        });
        return build;
    }

    /**
     *  判断 name 是否是已注册组件
     */
    static hasComponent(name: string): boolean {
        return ComponentManager.registed.has(name);
    }

    static getInstance(id: number): AbstractComponent {
        return ComponentManager.instances.get(id);
    }

    /**
     *  注销 component, 清楚注册信息
     */
    static cancelComponent(name: string) {
        let cancels = ComponentManager.nameIdMap.get(name);
        let keys    = ComponentManager.instances.keys();

        ComponentManager.registers.delete(name);
        ComponentManager.registed.delete(name);
        forEachKey<number>(keys, (value) => {
            if (cancels.indexOf(value) >= 0) {
                ComponentManager.instances.delete(value);
                ViewModelManager.deleteViewModel(value);
            }
        });
        ComponentManager.nameIdMap.delete(name);
    }

    static deleteComponent(id: number) {
        ComponentManager.instances.delete(id);
        ComponentManager.nameIdMap.forEach(v => {
            remove(v, id);
        });
    }

    static getAllRegisters(): Array<AbstractComponentConstructor> {
        let ret = [];
        ComponentManager.registers.forEach(v => {
            ret.push(v.newFunc);
        });
        return ret;
    }
}

window['_ComponentManager'] = ComponentManager;
