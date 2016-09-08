import SenceManager from '../ctrl/SenceManager';
import {ComponentNode} from '../ctrl/ComponentManager';
import {elementToComponentNode} from '../parser/Template';
import {errorHandler} from './Component';

const DEFAULT = {
    template: `
        <sence>
        </sence>
    `
};

export interface SenceLike {
    template: string,
    injector?: any,
    prop?: Array<string>
}

export default function (component: SenceLike = DEFAULT) {
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
        SenceManager.reigsterSence(targetConstructor, cn);
    };
}
