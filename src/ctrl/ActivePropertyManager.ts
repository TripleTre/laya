import {Getter} from './DirectiveManager';
import Is from '../util/Is';

export interface ActiveProperties {
    data:   Set<string>;
    prop?:  Set<string>;
    getter: Set<Getter>;
}

export default class ActivePropertyManager {
    /**
     * 保存一类组件有哪些响应属性
     */
    private static activeProperties: Map<string, ActiveProperties> = new Map<string, ActiveProperties>();

    static addDataActiveProperty(name: string, propertyName: string): void {
        ActivePropertyManager.activeProperties.get(name).data.add(propertyName);
    }

    static addPropActiveProperty(name: string, propertyName: string): void {
        let prop = ActivePropertyManager.activeProperties.get(name).prop;
        if (Is.isPresent(prop)) {
            prop.add(propertyName);
        }
    }

    static addGetterActiveProperty(name: string, getter: Getter): void {
        ActivePropertyManager.activeProperties.get(name).getter.add(getter);
    }

    static initActiveProperty(name: string, activeProperties: ActiveProperties): void {
        ActivePropertyManager.activeProperties.set(name, activeProperties);
    }

    /**
     *  根据组件名, 获取组件的所有响应属性
     */
    static getActiveProperties(name: string): ActiveProperties{
        return ActivePropertyManager.activeProperties.get(name);
    }
}
