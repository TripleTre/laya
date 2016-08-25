import * as Redux from 'redux/index.d.ts';

interface Container<T> {
        add(obj: T): void;

        remove(obj: T, destory: boolean): boolean;

        destroy(): void;
    }

    interface DisplayObject {
        getRealObject<T>(): T;
        destroy(): void;
    }

    interface Game {
        setWorld(world: World): void;
        getWorld(): World;
        startSence(name: string, clearWorld: boolean, clearCache?: boolean): void;
        registerSence(key: string, sence: AbstractSenceConstructor);
    }

    interface Sence {
        create?(): void;
        preLoad?(): void;
        update?(): void;
    }

    interface World extends Container<DisplayObject> {}
 
/**
 * AbstractComponentConstructor 指定了Component 的构造函数规范
 * AbstractComponent 指定了Component 实例的规范
 * 所有 Component 必须继承自 AbstractComponent 接口
 */
export interface AbstractComponentConstructor {
    new (): AbstractComponent;
}

export class AbstractComponent {
    destrop(): void;
    setRootContainer(value: Container<DisplayObject>): void;
    getId(): number;
    setId(id: number): void;
    getOwn(): AbstractComponent | AbstractSence;
    setOwn(own: AbstractComponent | AbstractSence): void;
}

export interface AbstractSenceConstructor {
    new (): AbstractSence;
}

export class AbstractSence {
    /**
     *  返回场景对象的所有子组件
     */
    getSubComponents(): Array<AbstractComponent>;
    addSubComponent(component: AbstractComponent): void;
    getLayaGame(): Game;
    setLayaGame(game: Game): void;
    destorySubComponents(): void;
    getWorld(): World;
    preload(): void;
    destroy(): void; 
}

export namespace LayaAbstracts {
    interface Container<T> {
        add(obj: T): void;

        remove(obj: T, destory: boolean): boolean;

        destroy(): void;
    }

    interface DisplayObject {
        getRealObject<T>(): T;
        destroy(): void;
    }

    interface Game {
        setWorld(world: World): void;
        getWorld(): World;
        startSence(name: string, clearWorld: boolean, clearCache?: boolean): void;
        registerSence(key: string, sence: AbstractSenceConstructor);
    }

    interface Sence {
        create?(): void;
        preLoad?(): void;
        update?(): void;
    }

    interface World extends Container<DisplayObject> {}
}

export default class Laya {
    static store:    Redux.Store<any>;
    static curSence: AbstractSence;
    static game:     Game;
    static initRedux(reducers: any, defaultValue: any): void;
    static boot(game: Game, sence: string): void;
    static registerSence(sences: Array<AbstractSenceConstructor>): void;
    static registerComponent(components: Array<AbstractComponentConstructor>): void;
    static startSence(name: string, clearWorld: boolean, clearCache?: boolean): void;
    static useDisplayObject(impls: any): void;
    static cancelComponent(name: string): void;
    static rebuildSence(): void;
}

export interface Directive {
    name:   string;
    bind:   (cpt: AbstractComponent | AbstractSence, target: any, argument: string, value: (context) => any, triggers: Array<string>) => void;
    unbind: () =>  void;
}

interface Getter {
    /**
     * getter 属性的值为一个函数, 参数为当前 state 对象和getter属性修饰的组件实例
     */
    getter:  (state: any, context: any) => any,
    name:    string,
    compare: boolean
}

export interface SenceLike {
    template: string;
}

export interface ComponentLike {
    template: string;
}

export function sence(sence?: SenceLike): any;

export function data(arg1: any, propertyName: string): any;

export function component(cpt: ComponentLike): any;

export function prop(arg1: any, propertyName: string): any;

export function getter(getter: (state: any, context: AbstractComponent | AbstractSence) => any, compare?: boolean);

export function watch(property: string): any;
