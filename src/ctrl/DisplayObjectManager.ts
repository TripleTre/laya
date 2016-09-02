import {LayaContainer, LayaGame} from '../abstract/LayaInterface';
import {AbstractComponent} from '../abstract/AbstractComponent';
import {AbstractSence} from '../abstract/AbstractSence';
import {ComponentNode} from './ComponentManager';
import ComponentManager from './ComponentManager';
import DirectiveManager from './DirectiveManager';
import Is from '../util/Is';
import postProcesser from '../post-processer';
import SupportObjectManager from './SupportObjectManager';
import {AbstractDisplayObject} from '../abstract/AbstractDisplay';
import {AbstractDisplayObjectConstructor} from '../abstract/AbstractDisplay';

export function collectAttributes(node: ComponentNode, own: AbstractComponent | AbstractSence, requireAttrs: Array<string>, optionalAttrs: Array<string>): any {
    let setters  = Object.create(null);
    let require  = Object.create(null);
    let optional = Object.create(null);
    node.normals.forEach(({name: attrName, value: attrVal}) => {
        let parsedName = attrName.replace(/\-([a-z])/g, (a: string, b: string) => {
                    return b.toUpperCase();
        });
        let calcValue = attrVal(own); // 表达式计算结果
        if (calcValue === undefined) {
            console.warn(node.name + ' 标签,' + parsedName + '属性计算结果为 undefined，检查标签中属性值是否拼写错误.');
        }
        if (requireAttrs.indexOf(parsedName) >= 0) {
            require[parsedName] = calcValue;
        } else if (optionalAttrs.indexOf(parsedName) >= 0) {
            optional[parsedName] = calcValue;
        } else {
            setters[parsedName] = calcValue;
        }
    });
    node.directives.forEach(({argument, value}) => {
        let calcValue = value(own); // 表达式计算结果
        if (calcValue === undefined) {
            console.warn(node.name + ' 标签,' + argument + '属性计算结果为 undefined，检查标签中属性值是否拼写错误.');
        }
        if (requireAttrs.indexOf(argument) >= 0) {
            require[argument] = calcValue;
        } else if (optionalAttrs.indexOf(argument) >= 0) {
            optional[argument] = calcValue;
        } else if (argument.length > 0) {
            setters[argument] = calcValue;
        }
    });
    if (Object.keys(require).length < requireAttrs.length) {
        throw new Error(node.name + ' 标签, 缺少必须的属性, 必须属性有: ' + requireAttrs);
    }
    return {
        require,
        optional,
        setters
    };
}

/**
 *  @para own 拥有 DisplayObject 的上级组件
 *  @para name DisplayObject 名称
 *  @para node 标签解析结果
 *  @para container 在引擎层面包含 displayObject 的容器
 */
export default class DisplayObjectManager {
    private static registers: Map<string, AbstractDisplayObjectConstructor> = new Map<string, AbstractDisplayObjectConstructor>();
    private static instances: Map<number, AbstractDisplayObject> = new Map<number, AbstractDisplayObject>();

    /**
     *  构造DisplayObject时,必须传入构造函数的参数
     */
    private static requireAttrs: Map<string, Array<string>> = new Map<string, Array<string>>();
    /**
     *  构造DisplayObject时, 可选的参数
     */
    private static optionalAttrs: Map<string, Array<string>> = new Map<string, Array<string>>();

    static buildDisplayObject(own: AbstractComponent | AbstractSence,
                              node: ComponentNode, game: LayaGame, container: LayaContainer, id: number = -1): AbstractDisplayObject {
        if (node.check.some(v => !v(own))) {
            return;
        }
        let name   = node.name;
        let registe = DisplayObjectManager.registers.get(name);
        if (Is.isAbsent(registe)) {
            console.error(name + '对象未注册');
            return;
        }
        let {require, optional, setters} = collectAttributes(node, own, registe.$$require, registe.$$optional);
        let build: AbstractDisplayObject = new registe(game, require, optional, id);
        DisplayObjectManager.instances.set(build.getId(), build);
        node.directives.forEach(({name, argument, value, triggers}) => {
             DirectiveManager.getDirective(name).bind(own, build, argument, value, triggers);
        });
        for (let attr in setters) { // 处理标签中的设置属性
            build[attr] = setters[attr];
        }
        let postFunc = postProcesser[name]; // 特别处理
        if (Is.isPresent(postFunc) && typeof postFunc === 'function') {
            postFunc(build, own, node, game, container);
        } else {
            let len = build['$$repeatCount'] || 1;
            for (let i = 0; i < len; i++) {
                if (build['$$repeatCount'] && build['$$repeatName']) {
                    (<AbstractComponent>own).setRepeatIndex(build['$$repeatName'], i);
                }
                node.children.forEach(v => {
                    if (SupportObjectManager.hasSupport(v.name)) {
                        SupportObjectManager.buildSupportObject(own, v, game, build);
                    } else if (ComponentManager.hasComponent(v.name)) {
                        console.error('只有 container 和 shadow 标签能包含子组件! find in' + v.name);
                    } else if (DisplayObjectManager.hasDisplay(v.name)) {
                        console.error('display object 一类的标签只能包含 support 标签, find in ' + v.name);
                    }
                });
            }
            container.addChildren(build);
            container.add(build);
        }
        return build;
    }

    static registerDisplayObject(newFunc: AbstractDisplayObjectConstructor) {
        let name = newFunc['name'];
        DisplayObjectManager.registers.set(name, newFunc);
        DisplayObjectManager.requireAttrs.set(name, []);
        DisplayObjectManager.optionalAttrs.set(name, []);
    }

    static getLayaObjectImpl(name: string): any {
        return DisplayObjectManager.registers.get(name);
    }

    static addToRequireAttrs(name: string, attr: string): void {
        DisplayObjectManager.requireAttrs.get(name).push(attr);
    }

    static addToOptionalAttrs(name: string, attr: string): void {
        DisplayObjectManager.optionalAttrs.get(name).push(attr);
    }

    static hasDisplay(name: string): boolean {
        return DisplayObjectManager.registers.has(name);
    }

    static getInstance(id: number): AbstractDisplayObject {
        return DisplayObjectManager.instances.get(id);
    }

    static addInstance(obj: AbstractDisplayObject) {
        DisplayObjectManager.instances.set(obj.getId(), obj);
    }

    static deleteDisplay(id: number): void {
        let instance = DisplayObjectManager.instances.get(id);
        if (Is.isAbsent(instance)) {
            return;
        }
        instance.destroy();
        DisplayObjectManager.instances.delete(id);
        instance.getChildren().forEach(v => {
            if (v instanceof AbstractDisplayObject) {
                DisplayObjectManager.deleteDisplay(v.getId());
            }
        });
    }
}

window['_DisplayObjectManager'] = DisplayObjectManager;
