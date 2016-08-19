import * as Redux from 'redux/index.d.ts';

export function mergeNormalsAndDirectives(normals: Array<Attr>, directives: Array<Attr>, vm: any): any; 

interface ComponentLike {
    template: string;
}

export function component(component: ComponentLike): (targetConstructor: AbstractComponentConstructor) => void;

export function prop(arg1: any, propertyName: string): void;

export function getter(exp: Function, force?: boolean): (arg1: any, propertyName: string) => void;

export function data(arg1: any, propertyName: string): void;

interface SenceLike {
    template: string;
}

export function sence(component?: SenceLike): (targetConstructor: any) => void;

export interface Directive {
    name: string;
    /**
     * @param name 组件的注册名
     * @param self 使用指令的组件
     * @param target 绑定的Phaser对象, 或组件对象
     * @param argument 指令的参数
     * @param value 指令的值
     * @param app Application 对象
     */
    bind(name: string, self: AbstractComponent, target: any, argument: string, value: string, app: Application): void;
    unbind(): void;
}

export interface AbstractSenceConstructor {
    new (): AbstractSence;
}

export interface AbstractSence {
    refs: Map<string, any>;
    getWorld(): World;
    preload(): void;
    destroy?(): void; // todo 暂时问号
}

export namespace LayaObjects {
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
        senceJump(state: string, clearWorld?: boolean, clearCache?: boolean): void;
        registerSence(key: string, state: any);
    }

    interface State {
        create?(): void;
        preLoad?(): void;
        update?(): void;
    }

    interface World extends Container<DisplayObject> {}
}

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
    senceJump(state: string, clearWorld?: boolean, clearCache?: boolean): void;
    registerSence(key: string, state: any);
}

interface State {
    create?(): void;
    preLoad?(): void;
    update?(): void;
}

interface World extends Container<DisplayObject> {}

export interface AbstractComponentConstructor {
    new (): AbstractComponent;
}
export declare abstract class AbstractComponent {
    private getterMap: Map<Function, string>;
    private id: number;
    private rootContainer: Container<DisplayObject>;
    refs: Map<string, any>;
    destroy(): void;
    getId(): number;
    setId(id: number): void;
    setRootContainer(value: Container<DisplayObject>): void;
    addGetterMap(getter: Function, attribute: string): void;
}

declare interface DataPropGetter {
    data:   Set<string>;
    prop:   Set<string>;
    getter: Set<Getter>;
}

declare interface Getter {
    getter: Function,
    name:   string,
    force:  boolean
}

export interface ComponentItem {
    normals:          Array<Attr>;
    children:         Array<ComponentItem>;
    directives:       Array<Attr>;
}

declare class Application {
    store:  Redux.Store<any>;
    private game;
    private sence;
    private curSence;
    private components;
    private directives;
    private dependencies;
    private senceTreeMap;
    private componentTreeMap;
    private componentDataMap;
    private displayObjectCons;
    private cptDataPropGetter;
    private componentMap: Map<number, AbstractComponent>;
    private cptNameToIdMap: Map<string, Array<number>>;
    constructor();
    registerComponent(creator: AbstractComponentConstructor, tree: Document): void;
    registerSence(creator: AbstractSenceConstructor, tree: Document): void;
    /**
     *  构建场景
     */
    buildSence(senceName: string, sence: AbstractSence, viewModel?: any, ignore?: any[]): void;
    initDependencies(cpt: string, ...item: Array<ComponentItem>): void;
    setComponentViewModel(name: string, cpt: AbstractComponent, vm?: any, ignore?: Array<string>): any;
    /**
     * @param sence 场景
     * @param own 组件的上级， 可能是另一个组件或者是一个场景对象
     * @param owenName 上层组件的名称
     * @param name 组件的名称，大小写敏感，其实就是组件类的类名
     * @param ele 以组件名为名的标签上的解析结果，比如： <spin attr="attr" />， attr 属性就在 ele.normals 里面
     *            而组件的实现中标签的解析结果， 需从 componentTreeMap 中取出。
     * @param container 父级容器
     * @param viewModel 可选， 用于使用现有数据重新构建 component
     * @param ignore 可选， hmr 时更新的 component 不能用 vm 重建
     */
    buildComponent(sence: string, own: AbstractComponent, ownName: string, name: string, ele: ComponentItem, container: Container<DisplayObject>, viewModel?: any, ignore?: Array<string>): AbstractComponent;
    /**
     * @param senceName 场景
     * @param own 拥有 DisplayObject 的上层组件
     * @param ownName 上层组件名称
     * @param name DisplayObject 名称
     * @param obj 当前 displayObject 标签解析结果
     * @param container 在引擎层面包含 displayObject 的容器
     */
    buildDisplayObject(senceName: string, own: AbstractComponent, ownName: string, name: string, obj: ComponentItem, container: Container<DisplayObject>): DisplayObject;
    getValue(cpt: string, path: string): any;
    addDependencies(cpt: string, property: string, fn: Function): void;
    getDependencies(cpt: string, prop: string): Array<Function>;
    setupDirective(directive: Directive): void;
    getDirective(key: string): Directive;
    /**
     *  返回相应 component 的所有响应属性，包括 data prop getter
     */
    getDataVm(name: string, cpt: AbstractComponent): any;
    setDataVm(name: string, cpt: AbstractComponent, prop: string, value: any): void;
    getCurSence(): string;
    /**
     * 为组件注册添加属于 data 一类的属性
     * @cptName 组件名
     * @proName 属性名
     * @type 类型  data prop 或 getter
     */
    addDataPropertyForComponent(cptName: string, proName: string, type: string): void;
    addGetterPropertyForComponent(cptName: string, proName: string, type: string): void;
    boot(game: Game, state: string): void;
    senceJump(state: string, clearWorld: boolean, clearCache: boolean): void;
    init(args: Array<AbstractComponentConstructor | AbstractSenceConstructor>): void;
    setupDisplayObject(creates: any): void;
    initRedux(reducers: Redux.ReducersMapObject, defaultValue: any): void;
    /**
     * 将 name 所指定的组件注册的信息全部清除
     */
    clearCptAllData(name: string): void;
    destoryCptForSence(name: string): void;
    activePropOrGetter(cptName: string, cpt: AbstractComponent, property: string, value: any): void;
    getComponent(id: number): AbstractComponent;
}

declare var app: Application;
export default app;
