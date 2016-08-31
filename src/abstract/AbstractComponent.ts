import {LayaContainer} from './LayaInterface';
import {AbstractSence} from './AbstractSence';
import {Getter} from '../ctrl/DirectiveManager';
import counter from './Counter';
import ComponentManager from '../ctrl/ComponentManager';
import {forEachKey} from '../util/Iter';

/**
 * AbstractComponentConstructor 指定了Component 的构造函数规范
 * AbstractComponent 指定了Component 实例的规范
 * 所有 Component 必须继承自 AbstractComponent 接口
 */
export interface AbstractComponentConstructor {
    new (id: number): AbstractComponent;
}

export class AbstractComponent {
    refs: Map<string, any> = new Map<string, any>();
    private repeatScope: Map<string, Array<any>> = new Map<string, Array<any>>();
    private repeatIndex: Map<string, number> = new Map<string, number>();
    private $$repeatAttrs: Set<string> = new Set<string>();
    private own: AbstractComponent | AbstractSence;
    private id: number;
    private rootContainer: LayaContainer;
    private getterProperty: Map<Getter, string> = new Map<Getter, string>();

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

    hasRepeatAttr(name: string): boolean {
        return this.$$repeatAttrs.has(name.replace('Index', ''));
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
