import {AbstractComponent} from '../abstract/AbstractComponent';
import {AbstractSence} from '../abstract/AbstractSence';
import {ComponentNode} from './ComponentManager';
import {LayaGame} from '../abstract/LayaInterface';
import {collectAttributes} from './DisplayObjectManager';
import DirectiveManager from './DirectiveManager';
import {AbstractSupportObject, AbstractSupportObjectConstructor} from '../abstract/AbstractSupport';
import {AbstractDisplayObject} from '../abstract/AbstractDisplay';
import ObjectManager from './ObjectManager';
import Is from '../util/Is';
import SupportObjectManager from './SupportObjectManager';

const ignoreList = ['SoundTask', 'Tween'];

export default class SupportObjectManger {
    private static registers: Map<string, AbstractSupportObjectConstructor> = new Map<string, AbstractSupportObjectConstructor>();
    /**
     *  构造DisplayObject时,必须传入构造函数的参数
     */
    private static requireAttrs: Map<string, Array<string>> = new Map<string, Array<string>>();
    /**
     *  构造DisplayObject时, 可选的参数
     */
    private static optionalAttrs: Map<string, Array<string>> = new Map<string, Array<string>>();

    static buildSupportObject(own: AbstractComponent | AbstractSence,
                              node: ComponentNode, game: LayaGame, target: AbstractDisplayObject<any> | AbstractSupportObject, id: number = -1): AbstractSupportObject {
        if (node.check.some(v => !v(own))) {
            return;
        }
        let name       = node.name;
        let registe    = SupportObjectManger.registers.get(name);
        let {require, optional, setters} = collectAttributes(node, own, registe.$$require, registe.$$optional);
        let build = new registe(game, target, require, optional, id);
        ObjectManager.setObject(build.getId(), build);
        target.addChildren(build.getId());
        node.directives.forEach(({name, argument, value, triggers}) => {
            DirectiveManager.getDirective(name).bind(own, build, argument, value, triggers);
        });
        for (let attr in setters) { // 处理标签中的设置属性
            build[attr] = setters[attr];
        }
        node.children.forEach(v => {
            if (SupportObjectManger.hasSupport(v.name)) {
                SupportObjectManger.buildSupportObject(own, v, game, build);
                // build[v.name] = sub;
            } else {
                console.error('support 类型的标签只能包含 support 类型标签, 实际包含了: ' + v.name);
            }
        });
        if (target.constructor.prototype.hasOwnProperty(node.name)) {
            target[node.name] = build;
        } else {
            if (ignoreList.indexOf(node.name) < 0) {
                console.warn(target.constructor['$$name'] + '不存在 ' + node.name + ' set 属性！');
            }
        }
        return build;
    }

    static registerSupportObject(newFunc: AbstractSupportObjectConstructor) {
        let name = newFunc['$$name'];
        SupportObjectManger.registers.set(name, newFunc);
        SupportObjectManger.requireAttrs.set(name, []);
        SupportObjectManger.optionalAttrs.set(name, []);
    }

    static hasSupport(name: string): boolean {
        return SupportObjectManger.registers.has(name);
    }

    static getSupport(name: string): AbstractSupportObjectConstructor {
        return SupportObjectManger.registers.get(name);
    }

    static deleteSupportObject (id) {
        let instance = ObjectManager.getObject<AbstractDisplayObject<any>>(id);
        if (Is.isAbsent(instance)) {
            return;
        }
        instance.destroy();
        instance.getChildren().forEach(id => {
            let child = ObjectManager.getObject(id);
            if (child instanceof AbstractSupportObject) {
                SupportObjectManager.deleteSupportObject(id);
            }
        });
        ObjectManager.deleteObject(id);
    }
}

window['_SupportObjectManager'] = SupportObjectManger;
