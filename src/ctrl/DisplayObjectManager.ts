import {DisplayObject, Container, Game} from '../abstract/LayaAbstracts';
import {AbstractComponent} from '../abstract/AbstractComponent';
import {AbstractSence} from '../abstract/AbstractSence';
import {ComponentNode} from './ComponentManager';
import ComponentManager from './ComponentManager';
import {parseDirective} from '../parser/Template';
import DirectiveManager from './DirectiveManager';
import Is from '../util/Is';
import postProcesser from '../post-processer';
import {AbstractSupport} from '../abstract/AbstractSupport';
import SupportObjectManager from './SupportObjectManager';

export function collectAttributes(node: ComponentNode, own: AbstractComponent | AbstractSence): any {
    let attributes = Object.create(null);
    node.normals.forEach(({name: attrName, value: attrVal}) => {
        let parsedName = attrName.replace(/\-([a-z])/g, (a: string, b: string) => {
                    return b.toUpperCase();
        });
        let calcValue = attrVal(own); // 表达式计算结果
        if (calcValue === undefined) {
            console.warn(name + ' 标签,' + parsedName + '属性计算结果为 undefined，检查标签中属性值是否拼写错误.');
        }
        attributes[parsedName] = calcValue;
    });
    node.directives.forEach(({name, argument, value, triggers}) => {
        let calcValue = value(own); // 表达式计算结果
        if (calcValue === undefined) {
            console.warn(name + ' 标签,' + argument + '属性计算结果为 undefined，检查标签中属性值是否拼写错误.');
        }
        attributes[argument] = calcValue;
    });
    return attributes;
}

/**
 *  @para own 拥有 DisplayObject 的上级组件
 *  @para name DisplayObject 名称
 *  @para node 标签解析结果
 *  @para container 在引擎层面包含 displayObject 的容器
 */
export default class DisplayObjectManager {
    private static registers: Map<string, any> = new Map<string, any>();
    /**
     *  构造DisplayObject时,必须传入构造函数的参数
     */
    private static requireAttrs: Map<string, Array<string>> = new Map<string, Array<string>>();
    /**
     *  构造DisplayObject时, 可选的参数
     */
    private static optionalAttrs: Map<string, Array<string>> = new Map<string, Array<string>>();

    static buildDisplayObject(own: AbstractComponent | AbstractSence,
                              node: ComponentNode, game: Game, container: Container): DisplayObject {
        // if (node.name === 'Graphics') {
        //     debugger;
        // }
        let name       = node.name;
        let registe    = DisplayObjectManager.registers.get(name);
        if (Is.isAbsent(registe)) {
            console.error(name + '对象未注册');
            return;
        }
        let attributes = collectAttributes(node, own);
        let build = new registe(game, attributes);
        node.directives.forEach(({name, argument, value, triggers}) => {
             DirectiveManager.getDirective(name).bind(own, build, argument, value, triggers);
        });
        node.normals.forEach(({name, value}) => {
            let parsedName = name.replace(/\-([a-z])/g, (a: string, b: string) => {
                        return b.toUpperCase();
            });
            let calcValue = value(own);
            if (calcValue === undefined) {
                console.warn(name + ' ,' + parsedName + '属性计算结果为 undefined，检查标签中属性值是否拼写错误.');
            }
            build[parsedName] = calcValue;
        });
        node.children.forEach(({name}) => {
            if (SupportObjectManager.hasSupport(name)) {
                debugger;
            }
        });
        let postFunc = postProcesser[name];
        if (Is.isPresent(postFunc) && typeof postFunc === 'function') {
            postFunc(build, own, node, game, container);
        } else {
            container.add(build);
        }
        return build;
    }

    /**
     * 
     */
    static setLayaObjectImpl(impls: any) {
        for (let name in impls) {
            if (impls.hasOwnProperty(name)) {
                DisplayObjectManager.registers.set(name, impls[name]);
            }
        }
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
}
