import {AbstractComponentConstructor} from '../abstract/AbstractComponent';
import {ComponentNode} from '../ctrl/ComponentManager';
import ComponentManager from '../ctrl/ComponentManager';
import {elementToComponentNode} from '../parser/Template';
import app from '../index';

export interface ComponentLike {
    template: string;
}

export default function (component: ComponentLike) {
    let template: string        = component.template;
    let paser:    DOMParser     = new DOMParser();
    let ele:      Element       = <Element>(paser.parseFromString(template, 'text/xml')).firstChild;
    let cn:       ComponentNode = elementToComponentNode(ele);
    return function (targetConstructor: AbstractComponentConstructor) {
        ComponentManager.registerComponent(targetConstructor, cn);
    };
}
