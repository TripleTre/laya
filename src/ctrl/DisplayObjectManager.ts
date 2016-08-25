import {DisplayObject, Container, Game} from '../abstract/LayaAbstracts';
import {AbstractComponent} from '../abstract/AbstractComponent';
import {AbstractSence} from '../abstract/AbstractSence';
import {ComponentNode} from './ComponentManager';
import ComponentManager from './ComponentManager';
import {parseDirective} from '../parser/Template';
import DirectiveManager from './DirectiveManager';
import Is from '../util/Is';

/**
 *  @para own 拥有 DisplayObject 的上级组件
 *  @para name DisplayObject 名称
 *  @para node 标签解析结果
 *  @para container 在引擎层面包含 displayObject 的容器
 */
export default class DisplayObjectManager {
    private static registers: Map<string, any> = new Map<string, any>();

    static buildDisplayObject(own: AbstractComponent | AbstractSence,
                              node: ComponentNode, game: Game): DisplayObject {
        let name       = node.name;
        let registe    = DisplayObjectManager.registers.get(name);
        if (Is.isAbsent(registe)) {
            console.error(name + '对象未注册');
            return;
        }
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
        let build = new registe(game, attributes);
        node.directives.forEach(({name, argument, value, triggers}) => {
             DirectiveManager.getDirective(name).bind(own, build, argument, value, triggers);
        });
        if (name === 'Container') {
            let len = build['$$repeatCount'] || 1;
            for (let i = 0; i < len; i++) {
                if (build['$$repeatCount'] && build['$$repeatName']) {
                    (<AbstractComponent>own).setRepeatIndex(build['$$repeatName'], i);
                }
                node.children.forEach(v => {
                    if (ComponentManager.hasComponent(v.name)) {
                        ComponentManager.buildComponent(own, v, build, game);
                    } else {
                        build.add(DisplayObjectManager.buildDisplayObject(own, v, game));
                    }
                });
            }
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
}
