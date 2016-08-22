import {DisplayObject, Container, Game} from '../abstract/LayaObject';
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
        let attributes = Object.create(null);
        node.normals.forEach(({name: attrName, value: attrVal}) => {
            attrName = attrName.replace(/\-([a-z])/g, (a: string, b: string) => {
                        return b.toUpperCase();
            });
            attributes[attrName] = attrVal(own);
        });
        node.directives.forEach(({name, argument, value, triggers}) => {
             attributes[argument] = value(own);
        });
        let build      = new registe(game, attributes);
        node.directives.forEach(({name, argument, value, triggers}) => {
             DirectiveManager.getDirective(name).bind(own, build, argument, value, triggers);
        });
        if (name === 'Container') {
            node.children.forEach(v => {
                if (Is.isPresent(ComponentManager.hasComponent(name))) {
                    ComponentManager.buildComponent(own, v, build, game);
                } else {
                    build.add(DisplayObjectManager.buildDisplayObject(own, v, game));
                }
            });
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
