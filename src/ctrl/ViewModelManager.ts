import {AbstractComponent} from '../abstract/AbstractComponent';
import {AbstractSence} from '../abstract/AbstractSence';
import {ActiveProperties} from './ActivePropertyManager';
import StateManager from './StateManager';
import equal from '../util/DeepEqual';

export interface ViewModel {
    value: any;
    dependences: Array<Function>;
}

export default class ViewModelManager {
    private static viewModel: Map<number, Map<string, ViewModel>> = new Map<number, Map<string, ViewModel>>();

    /**
     * @param id 组件id
     * @param name 组件类的属性名称
     * @param dependence 依赖, name属性改变后,要执行的回调函数
     */
    static addDependences(id: number, name: string, dependence: Function) {
        ViewModelManager.viewModel.get(id).get(name).dependences.push(dependence);
    }

    /**
     * 初始化组件的viewModel, 设置属性和属性的默认值, 初始化依赖数组
     * @param id 组件id
     * @param name 属性名称
     * @param defaultValue 默认值
     */
    static addViewModel(id: number, name: string, defaultValue: any) {
        let viewModel = {
            value: defaultValue,
            dependences: []
        };
        ViewModelManager.viewModel.get(id).set(name, viewModel);
    }

    /**
     *  为sence 对象初始化viewModel. 设置响应属性和属性默认值, 初始化依赖数组
     *  @para sence sence对象
     *  @para activeProperties 该类 sence 对象的所有响应属性
     */
    static initSenceViewModel(sence: AbstractSence, activeProperties: ActiveProperties): void {
        let id  = sence.getId();
        let map = new Map<string, ViewModel>();
        ViewModelManager.viewModel.set(id, map);
        activeProperties.data.forEach(v => {
             ViewModelManager.addViewModel(id, v, sence[v]);
             ViewModelManager.defineData(sence, v, map.get(v));
        });
        activeProperties.getter.forEach(v => {
            ViewModelManager.addViewModel(id, v.name, v.getter(StateManager.getDefaultValue(), sence));
            if (v.compare === false) {
                StateManager.addToForce(v, id);
            } else {
                StateManager.addToGetters(v, id);
            }
            ViewModelManager.defineGetter(sence, v.name, map.get(v.name));
        });
    }

    static defineData(obj: AbstractComponent | AbstractSence, propertyName: string, viewModel: ViewModel) {
         Object.defineProperty(obj, propertyName, {
            get() {
                return viewModel.value;
            },
            set(newValue) {
                if (equal(viewModel.value, newValue)) {
                    return;
                }
                viewModel.value = newValue;
                viewModel.dependences.forEach(v => v.apply(null));
            }
        });
    }

    static defineGetter(obj: AbstractComponent | AbstractSence, propertyName: string, viewModel: ViewModel) {
        Object.defineProperty(obj, propertyName, {
            get() {
                return viewModel.value;
            },
            set (value) {
                console.warn('getter属性不能赋值。');
            }
        });
    }

    /**
     *  为 component 对象初始化viewModel. 设置响应属性和属性默认值, 初始化依赖数组
     *  @para component component
     *  @para activeProperties 该类 component 对象的所有响应属性
     */
    static initComponentViewModel(component: AbstractComponent, activeProperties: ActiveProperties): void {
        let id = component.getId();
        let map = new Map<string, ViewModel>();
        ViewModelManager.viewModel.set(id, map);
        activeProperties.data.forEach(v => {
            ViewModelManager.addViewModel(id, v, component[v]);
            ViewModelManager.defineData(component, v, map.get(v));
        });
        activeProperties.getter.forEach(v => {
            ViewModelManager.addViewModel(id, v.name, v.getter(StateManager.getDefaultValue(), component));
            if (v.compare === false) {
                StateManager.addToForce(v, id);
            } else {
                StateManager.addToGetters(v, id);
            }
            ViewModelManager.defineGetter(component, v.name, map.get(v.name));
        });
        activeProperties.prop.forEach(v => {
            ViewModelManager.addViewModel(id, v, component[v]);
            ViewModelManager.defineData(component, v, map.get(v));
        });
    }

    /**
     *  当某个组件的响应式属性需要改变时, 调用这个方法. 改变属性, 并执行相应的依赖.
     *  @para component 属性值改变了的组件实例
     *  @para property 改变的属性名
     *  @para value 改变后的属性值
     */
    static activePropertyForComponent(component: AbstractComponent, property: string, value: any): void {
        let viewModel = ViewModelManager.viewModel.get(component.getId()).get(property);
        viewModel.value = value;
        viewModel.dependences.forEach(v => {v.apply(null); });
    }

    static deleteViewModel(id: number) {
        ViewModelManager.viewModel.delete(id);
    }
}

window['_ViewModelManager'] = ViewModelManager;
