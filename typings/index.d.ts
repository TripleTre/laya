declare module 'laya' {
    class Application {
        store:  Store<any>;
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
         * @param own 组件的上级， 可能是另一个组件或者是一个场景对象
         * @param owenName 上层组件的名称
         * @param name 组件的名称，大小写敏感，其实就是组件类的类名
         * @param ele 以组件名为名的标签上的解析结果，比如： <spin attr="attr" />， attr 属性就在 ele.normals 里面
         *            而组件的实现中标签的解析结果， 需从 componentTreeMap 中取出。
         * @param container 父级容器
         * @param viewModel 可选， 用于使用现有数据重新构建 component
         * @param ignore 可选， hmr 时更新的 component 不能用 vm 重建
         */
        buildComponent(own: AbstractComponent, ownName: string, name: string, ele: ComponentItem, container: Container<DisplayObject<any>>, viewModel?: any, ignore?: Array<string>): AbstractComponent;
        /**
         * @param own 拥有 DisplayObject 的上层组件
         * @param ownName 上层组件名称
         * @param name DisplayObject 名称
         * @param obj 当前 displayObject 标签解析结果
         * @param container 在引擎层面包含 displayObject 的容器
         */
        buildDisplayObject(own: AbstractComponent, ownName: string, name: string, obj: ComponentItem, container: Container<DisplayObject<any>>): DisplayObject<any>;
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
        boot(game: Game, state: string): void;
        senceJump(state: string, clearWorld: boolean, clearCache: boolean): void;
        init(args: Array<AbstractComponentConstructor | AbstractSenceConstructor>): void;
        setupDisplayObject(creates: any): void;
        initRedux(reducers: Redux.ReducersMapObject): void;
        /**
         * 将 name 所指定的组件注册的信息全部清除
         */
        clearCptAllData(name: string): void;
    }
}
