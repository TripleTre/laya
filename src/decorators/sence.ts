import SenceManager from '../ctrl/SenceManager';
import {ComponentNode} from '../ctrl/ComponentManager';
import {elementToComponentNode} from '../parser/Template';
import {errorHandler} from './Component';

export interface SenceLike {
    template: string,
    injector?: any,
    prop?: Array<string>,
    name: string
}

export default function (component: SenceLike) {
    let template: string        = component.template;
    let injects:  any           = component.injector; //tslint:disable-line
    let paser:    DOMParser     = new DOMParser();
    let ele:      Element       = <Element>(paser.parseFromString(template, 'text/xml')).firstChild;
    errorHandler(ele, component.template);
    let cn: ComponentNode = elementToComponentNode(ele);
    return function (targetConstructor: any) {
        for (let attr in injects) {
            targetConstructor.prototype[attr] = injects[attr];
        }
        targetConstructor['$$name'] = component.name;
        SenceManager.reigsterSence(component.name, targetConstructor, cn);
    };
}
