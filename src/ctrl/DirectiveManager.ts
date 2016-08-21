import {AbstractComponent} from '../abstract/AbstractComponent';
import {AbstractSence} from '../abstract/AbstractSence';

export interface ParsedDirective {
    name:     string;
    argument: string;
    value:    (context) => any;
    triggers: Array<string>;
}

export interface Directive {
    name:   string;
    bind:   (cpt: AbstractComponent | AbstractSence, target: any, argument: string, value: (context) => any) => void;
    unbind: () =>  void;
}

export interface Getter {
    /**
     * getter 属性的值为一个函数, 参数为当前 state 对象和getter属性修饰的组件实例
     */
    getter:  (state: any, context: any) => any,
    name:    string,
    compare: boolean
}

export default class DirectiveManager {
    private static directives: Map<string, Directive>

    static addDirective(di: Directive) {
        DirectiveManager.directives.set(di.name, di);
    }

    static getDirective(name: string): Directive {
        return DirectiveManager.directives.get(name);
    }
}
