import * as Redux from 'redux/index.d.ts';
import '../node_modules/phaser/typescript/phaser.d.ts';

export namespace layaInterface{
    
    interface LayaContainer extends layaAbstract.AbstractDisplayObject {
        add(obj: layaAbstract.AbstractDisplayObject): void;

        remove(obj: layaAbstract.AbstractDisplayObject, destory: boolean): boolean;

        destroy(): void;
    }

    interface LayaGame {
        setWorld(world: LayaWorld): void;
        getWorld(): LayaWorld;
        startSence(name: string, clearWorld: boolean, clearCache?: boolean): void;
        registerSence(key: string, sence: layaAbstract.AbstractSence);
    }

    interface Sence {
        create?(): void;
        preLoad?(): void;
        update?(): void;
    }

    interface LayaWorld extends LayaContainer {}
}

export namespace layaAbstract{
    interface AbstractComponentConstructor {
        new (id: number): AbstractComponent;
    }

    abstract class AbstractComponent {
        constructor(id: number);

        $$refs: any;

        destroy(): void;

        setRootContainer(value: layaInterface.LayaContainer): void;

        getId(): number;

        getOwn(): AbstractComponent | AbstractSence;

        setOwn(own: AbstractComponent | AbstractSence): void;

        addToRepeatScope(name: string, value: any): void;

        setRepeatIndex(name: string, index: number): void;
    }

    interface AbstractDisplayObjectConstructor {
        $$require: Array<string>;
        $$optional: Array<string>;
        new(game: layaInterface.LayaGame, require: any, optional: any, id: number): AbstractDisplayObject;
    }

    abstract class AbstractDisplayObject {
        constructor(id: number);
        getId(): number;
        abstract getRealObject<T>(): T;
        abstract destroy(): void;
        abstract buildRealObject(game: layaInterface.LayaGame, require: any, optional: any): void;
    }

    export interface AbstractSenceConstructor {
        new (): AbstractSence;
    }

    export abstract class AbstractSence {
        $$refs: any;

        /**
         *  返回场景对象的所有子组件
         */
        getSubComponents(): Array<AbstractComponent>;

        addSubComponent(component: AbstractComponent): void;

        getLayaGame(): layaInterface.LayaGame;

        setLayaGame(game: layaInterface.LayaGame): void;

        destorySubComponent(): void;
        
        getId(): number;
    }

    interface AbstractSupportObjectConstructor {
        $$require: Array<string>;
        $$optional: Array<string>;
        new(game: layaInterface.LayaGame, target: any, require: any, optional: any, id: number): AbstractSupportObject;
    }

    abstract class AbstractSupportObject {
        constructor(id: number);
        getId(): number;
    }
}

export default class Laya {
    static curSence: layaAbstract.AbstractSence;
    static game:     layaInterface.LayaGame;
    static initRedux(reducers: any): void;
    static boot(game: layaInterface.LayaGame, sence: string): void;
    static registerSence(sences: Array<layaAbstract.AbstractSenceConstructor>): void;
    static registerComponent(components: Array<layaAbstract.AbstractComponentConstructor>): void;
    static registerSupportObject(supports: Array<layaAbstract.AbstractSupportObjectConstructor>): void;
    static startSence(name: string, clearWorld: boolean, clearCache?: boolean): void;
    static useDisplayObject(impls: any): void;
    static cancelComponent(name: string): void;
    static rebuildSence(): void;
    static dispatch(action: {type: any, value: any}): void;
    static getState(): any;
}

interface SupportLike {
    require: Array<string>,
    optional?: Array<string>
}

interface SenceLike {
    template: string;
    injector?: any;
     prop?: Array<string>;
}

interface ComponentLike {
    template: string;
    injector?: any;
    prop?: Array<string>;
}

interface DisplayLike {
    require: Array<string>;
    optional?: Array<string>;
}

export class GameBuilder {
    static getInstance(): GameBuilder;

    setWidth(width: number | string): GameBuilder;

    setHeight(height: number | string): GameBuilder;

    setRender(render: number): GameBuilder;

    setParent(parent: any): GameBuilder;

    setState(state: any): GameBuilder;

    setTransparent(transparent: boolean): GameBuilder;

    setAntialias(antialias: boolean): GameBuilder;

    setPhysicsConfig(physicsConfig: any): GameBuilder;

    build(): layaInterface.LayaGame;
}

export function sence(sence?: SenceLike): any;

export function data(arg1: any, propertyName: string): any;

export function component(cpt: ComponentLike): any;

export function support(support: SupportLike): any;

export function prop(arg1: any, propertyName: string): any;

export function getter(path: string);

export function watch(property: Array<string>): any;

