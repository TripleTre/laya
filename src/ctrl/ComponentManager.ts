import {AbstractComponentConstructor, AbstractComponent} from '../abstract/AbstractComponent';
import {AbstractSence} from '../abstract/AbstractSence';
import {LayaContainer, LayaGame, LayaWorld} from '../abstract/LayaInterface';
import {Getter, ParsedDirective} from './DirectiveManager';
import DirectiveManager from './DirectiveManager';
import ViewModelManager from './ViewModelManager';
import Is from '../util/Is';
import DisplayObjectManager from './DisplayObjectManager';
import {remove} from '../util/Array';
import condition from '../directive/Condition';
import ObjectManager from './ObjectManager';

export interface ActiveProperties {
    data:   Set<string>;
    prop?:  Set<string>;
    getter: Set<Getter>;
}

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
    private static nameIdMap: Map<string, Array<number>>     = new Map<string, Array<number>>();

    static registerComponent(name: string, newFunc: AbstractComponentConstructor, cptNode: ComponentNode) {
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
        let registe = ComponentManager.registers.get(name);
        let subNode = registe.node;
        let newFunc = registe.newFunc;
        let build   = new newFunc(id);
        // if (id > 0) {
        //     debugger;
        //     newFunc['$$data'].forEach(v => {build[v] = own[v]; });
        // }
        build.setLayaGame(game);
        build.setOwn(own);
        ViewModelManager.initComponentViewModel(build);
        subNode = replaceSlot(node, subNode);
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
            build[argument] = calcValue;
            DirectiveManager.getDirective(name).bind(own, build, argument, value, triggers);
        });
        let beforeHock = build['$$init']; // init 钩子, 在vm初始化完成后
        if (Is.isPresent(beforeHock) && typeof beforeHock === 'function') {
            beforeHock.apply(build);
        }
        // condition 绑定， 保留当前上下文
        registe.node.condition.forEach(({argument, value, triggers}) => {
            // 这里没有使用上级做上下文对象， 而是用组件自身， 这在 rebuild 的时候是可以也是必须的， 因为还要还原 data 属性(70行)
            condition.bind(build, node, container, game, build.getId(), argument, value, triggers);
        });
        let identify = build.getId();
        ObjectManager.setObject(identify, build);
        ComponentManager.nameIdMap.get(name).push(identify);
        if (Is.isPresent(newFunc['$$watch'])) {
            newFunc['$$watch'].forEach(({propertyName, propertyKey}) => {
                ViewModelManager.addDependences(identify, propertyName, build[propertyKey].bind(build));
                build[propertyKey].bind(build)(); // 根据现有 viewModel 重新build sence的时候
            });
        }
        // 构建组件的具体实现, 这必然是个container标签
        let implement = DisplayObjectManager.buildDisplayObject(build, subNode, container);
        build.setRootContainer(<any>implement);
        if (Is.isPresent(implement)) {
            container.add(implement);
        }
        let afterhock = build['$$create']; // create 钩子
        if (Is.isPresent(afterhock) && typeof afterhock === 'function') {
            afterhock.apply(build);
        }
        build.resetRepeatIndex();
        return build;
    }

    /**
     *  用于if标签， 组件实例没有删除的情况下， 根据组件上下文重新构建根 container
     */
    static buildRootContainer(id: number) {
        let instance = ObjectManager.getObject<AbstractComponent>(id);
        if (typeof instance['$$update'] === 'function') {
            instance['$$update'].apply(instance);
        }
        let name = instance.constructor['$$name'];
        console.log('buildRootContainer', name);
        let registe = ComponentManager.registers.get(name);
        let subNode = registe.node;
        let implement = DisplayObjectManager.buildDisplayObject(instance, subNode, instance.getOwn().getRootContainer());
        instance.setRootContainer(<any>implement);
        if (Is.isPresent(implement)) {
            instance.getOwn().getRootContainer().add(implement);
        }
        instance.resetRepeatIndex();
    }

    /**
     *  判断 name 是否是已注册组件
     */
    static hasComponent(name: string): boolean {
        return ComponentManager.registed.has(name);
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
        let cpt = ObjectManager.getObject<AbstractComponent>(id);
        if (Is.isPresent(cpt.getRootContainer())) {
            let rootId = cpt.getRootContainer().getId();
            DisplayObjectManager.deleteDisplay(rootId);
        }
        ObjectManager.deleteObject(id);
        ComponentManager.nameIdMap.forEach(v => {
            remove(v, id);
        });
    }

    /**
     *  刪除组件 root container, root container 下面的 displayObject, component, supportObject 都一并
     *  删除， 但是会保留组件实例。 这个用在 if 标签时。
     */
    static deleteComponentRootCootainer(id) {
        let cpt = ObjectManager.getObject<AbstractComponent>(id);
        if (Is.isPresent(cpt.getRootContainer())) {
            let rootId = cpt.getRootContainer().getId();
            DisplayObjectManager.deleteDisplay(rootId);
        }
    }

    static getAllRegisters(): Array<AbstractComponentConstructor> {
        let ret = [];
        ComponentManager.registers.forEach(v => {
            ret.push(v.newFunc);
        });
        return ret;
    }
}

function replaceSlot(source: ComponentNode, registe: ComponentNode): ComponentNode {
    source.children
          .filter(v => v.name === 'Flot')
          .forEach(v => {
              walk(v, registe);
          });
    return registe;
}

function walk(flot: ComponentNode, registe: ComponentNode): any {
    registe.children.forEach((child, index, children) => {
        if (child.name === 'Slot') {
            let flotName = flot.normals.filter(v => v.name === 'name')[0].value(undefined);
            let childName = child.normals.filter(v => v.name === 'name')[0].value(undefined);
            if (flotName === childName) {
                registe.children = children.slice(0, index).concat(flot.children).concat(children.slice(index + 1));
            }
        } else {
            if (child.children.length > 0) {
                walk(flot, child);
            }
        }
    });
}

window['_ComponentManager'] = ComponentManager;
