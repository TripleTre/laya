import {LayaContainer} from './LayaInterface';
import {AbstractSence} from './AbstractSence';
import counter from './Counter';
import {forEachKey} from '../util/Iter';

/**
 * AbstractComponentConstructor 指定了 Component 的构造函数规范
 * AbstractComponent 指定了 Component 实例的规范
 * 所有 Component 必须继承自 AbstractComponent 接口
 */
export interface AbstractComponentConstructor {
    new (id: number): AbstractComponent;
}

export interface ViewModel {
    value: any;
    dependences: Array<Function>;
}

export interface Getter {
    /**
     * getter 属性的值为一个函数, 参数为当前 state 对象和 getter 属性修饰的组件实例
     */
    getter:  (state: any, context: any) => any,
    name:    string,
    compare: boolean
}

export interface ComponentNode {
    name:       string;
    normals:    Array<{name: string, value: (context) => any}>;
    directives: Array<ParsedDirective>;
    children:   Array<ComponentNode>;
}

export interface ParsedDirective {
    name:     string;
    argument: string;
    value:    (context) => any;
    triggers: Array<string>;
}

export class AbstractComponent {
    $$refs:                any                  = Object.create(null);
    $$vm:                  Map<string, ViewModel>  = new Map<string, ViewModel>();
    private repeatScope:   Map<string, Array<any>> = new Map<string, Array<any>>();
    private repeatIndex:   Map<string, number>     = new Map<string, number>();
    private $$repeatAttrs: Set<string>             = new Set<string>();
    private own:            AbstractComponent | AbstractSence;
    private id:             number;
    private rootContainer:  LayaContainer;
    // private getterProperty: Map<Getter, string>     =  new Map<Getter, string>();

    constructor(id) {
        if (id < 0) {
            this.id = counter();
        } else {
            this.id = id;
        }
    }

    destroy(): void {
        this.rootContainer.destroy();
    }

    setRootContainer(value: LayaContainer): void {
        this.rootContainer = value;
    }

    getRootContainer(): LayaContainer {
        return this.rootContainer;
    }

    getId(): number {
        return this.id;
    }

    getOwn(): AbstractComponent | AbstractSence {
        return this.own;
    }

    setOwn(own: AbstractComponent | AbstractSence): void {
        this.own = own;
    }

    addToRepeatScope(name: string, value: any) {
        this.repeatScope.set(name, value);
        this.$$repeatAttrs.add(name);
        if (!this.hasOwnProperty(name)) {
            Object.defineProperty(this, name, {
                get() {
                    return this.repeatScope.get(name)[this.repeatIndex.get(name)];
                }
            });
        }
    }

    setRepeatIndex(name: string, index: number) {
        this.repeatIndex.set(name, index);
        if (!this.hasOwnProperty(name + 'Index')) {
            Object.defineProperty(this, name + 'Index', {
                get() {
                    return this.repeatIndex.get(name);
                }
            });
        }
    }

    hasOwnActiveProperty(name: string): boolean {
        let data = this.constructor['$$data'] || [];
        let prop = this.constructor['$$prop'] || [];
        let getter = this.constructor['$$getter'] || [];
        return data.concat(prop)
                   .concat(getter)
                   .indexOf(name) >= 0;
    }

    resetRepeatIndex() {
        forEachKey<string>(this.repeatIndex.keys(), (function (key) {
            this.repeatIndex.set(key, 0);
        }).bind(this));
    }

    generatorRepeatInfo() {
        let ret = Object.create(null);
        forEachKey<string>(this.repeatIndex.keys(), (function (key) {
            ret[key] = this.repeatIndex.get(key);
        }).bind(this));
        return ret;
    }
}
