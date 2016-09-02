import {AbstractComponentConstructor, AbstractComponent} from '../abstract/AbstractComponent';
import {AbstractSence} from '../abstract/AbstractSence';
import {LayaContainer, LayaGame, LayaWorld} from '../abstract/LayaInterface';
import {ActiveProperties} from './ActivePropertyManager';
import ActivePropertyManager from './ActivePropertyManager';
import {Getter, ParsedDirective} from './DirectiveManager';
import DirectiveManager from './DirectiveManager';
import ViewModelManager from './ViewModelManager';
import Is from '../util/Is';
import DisplayObjectManager from './DisplayObjectManager';
import {remove} from '../util/Array';
import WatchFunctionManager from './WatchFunctionManager';
import condition from '../directive/Condition';

export interface ComponentNode {
    name:       string;
    normals:    Array<{name: string, value: (context) => any}>;
    directives: Array<ParsedDirective>;
    children:   Array<ComponentNode>;
    check:      Array<(context) => any>;
    condition:  Array<ParsedDirective>;
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
                          container: LayaContainer | LayaWorld, game: LayaGame, id: number = -1): AbstractComponent {
        if (node.check.some(v => !v(own))) {
            return;
        }
        let name    = node.name;
        let registe = this.registers.get(name);
        let subNode = registe.node;
        let newFunc = registe.newFunc;
        let build   = new newFunc(id);
        let activeProperties = ActivePropertyManager.getActiveProperties(name);
        ViewModelManager.initComponentViewModel(build, activeProperties);
        // 设置 component prop 属性的默认值
        node.normals.forEach(({name: attrName, value: attrVal}) => {
            let parsedName = attrName.replace(/\-([a-z])/g, (a: string, b: string) => {
                        return b.toUpperCase();
            });
            let calcValue = attrVal(own); // 表达式计算结果
            if (calcValue === undefined) {
                console.warn(name + ' 组件,' + parsedName + '属性计算结果为 undefined，检查标签中属性值是否拼写错误.');
            }
            build[parsedName] = calcValue;
        });
        node.directives.forEach(({name, argument, value, triggers}) => {
            let calcValue = value(own); // 表达式计算结果
            if (calcValue === undefined) {
                console.warn(name + ' 组件,' + argument + '属性计算结果为 undefined，检查标签中属性值是否拼写错误.');
            }
            // build[argument] = calcValue;
            DirectiveManager.getDirective(name).bind(own, build, argument, value, triggers);
        });
        registe.node.condition.forEach(({argument, value, triggers}) => {
            condition.bind(build, node, container, game, build.getId(), argument, value, triggers);
        });
        let identify = build.getId();
        this.instances.set(identify, build);
        this.nameIdMap.get(name).push(identify);
        WatchFunctionManager.getWatchs(name).forEach(({property, func}) => {
            ViewModelManager.addDependences(identify, property, build[func].bind(build));
            build[func].bind(build)(); // 根据现有 viewModel 重新build sence的时候
        });
        // 构建组件的具体实现, 这必然是个container标签
        let implement = DisplayObjectManager.buildDisplayObject(build, subNode, game, container);
        build.setRootContainer(<any>implement);
        if (Is.isPresent(implement)) {
            container.add(implement);
        }
        let hock = build['$$create']; // create 钩子
        if (Is.isPresent(hock) && typeof hock === 'function') {
            hock.apply(build);
        }
        build.resetRepeatIndex();
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
     *  注销 component, 清除注册信息
     */
    static cancelComponent(name: string) {
        ComponentManager.registers.delete(name);
        ComponentManager.registed.delete(name);
        ComponentManager.nameIdMap.delete(name);
    }

    /**
     *  删除 component 实例
     */
    static deleteComponent(id: number) {
        let cpt = ComponentManager.instances.get(id);
        let rootId = cpt.getRootContainer().getId();
        DisplayObjectManager.deleteDisplay(rootId);
        cpt.destroy();
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
