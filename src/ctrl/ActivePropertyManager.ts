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
    private static waiteExecute: Map<string, Set<{property: any, type: string}>>
                           = new Map<string, Set<{property: any, type: string}>>();

    static addWaiteExecute(name: string, property: any, type: string): void {
        let set = ActivePropertyManager.waiteExecute.get(name);
        if (Is.isAbsent(set)) {
            let s = new Set<{property: any, type: string}>();
            ActivePropertyManager.waiteExecute.set(name, s.add({property, type}));
        } else {
            set.add({property, type});
        }
    }

    static doWaiteExecute(name: string) {
        let set = ActivePropertyManager.waiteExecute.get(name);
        if (Is.isAbsent(set)) {
            return;
        }
        set.forEach(v => {
            if (v.type === 'data') {
                ActivePropertyManager.activeProperties.get(name).data.add(v.property);
            } else if (v.type === 'prop') {
                let prop = ActivePropertyManager.activeProperties.get(name).prop;
                if (Is.isPresent(prop)) {
                    prop.add(v.property);
                }
            } else {
                ActivePropertyManager.activeProperties.get(name).getter.add(v.property);
            }
        });
    }

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
    static getActiveProperties(name: string): ActiveProperties {
        return ActivePropertyManager.activeProperties.get(name);
    }

    static cancelRegistData(name: string): void {
        ActivePropertyManager.activeProperties.delete(name);
        ActivePropertyManager.waiteExecute.delete(name);
    }

    static hasProp(cptName: string, propName: string) {
        return ActivePropertyManager.activeProperties.get(cptName).prop.has(propName);
    }
}

window['_ActivePropertyManager'] = ActivePropertyManager;
