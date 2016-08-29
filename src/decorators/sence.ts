import SenceManager from '../ctrl/SenceManager';
import {ComponentNode} from '../ctrl/ComponentManager';
import {elementToComponentNode} from '../parser/Template';

const DEFAULT = {
    template: `
        <sence>
        </sence>
    `
};

export interface SenceLike {
    template: string;
}

export default function (component: SenceLike = DEFAULT) {
    let template: string        = component.template;
    let paser:    DOMParser     = new DOMParser();
    let ele:      Element       = <Element>(paser.parseFromString(template, 'text/xml')).firstChild;
    let cn:       ComponentNode = elementToComponentNode(ele);
    return function (targetConstructor: any) {
        SenceManager.reigsterSence(targetConstructor, cn);
    };
}
