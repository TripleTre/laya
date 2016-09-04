import {AbstractComponentConstructor} from '../abstract/AbstractComponent';
import {ComponentNode} from '../ctrl/ComponentManager';
import ComponentManager from '../ctrl/ComponentManager';
import {elementToComponentNode} from '../parser/Template';

export interface ComponentLike {
    template: string,
    injector?: any
}

export default function (component: ComponentLike) {
    let template: string        = component.template;
    let injects:  any           = component.injector; //tslint:disable-line
    let paser:    DOMParser     = new DOMParser();
    let ele:      Element       = (paser.parseFromString(template, 'text/html')).body.firstElementChild;
    errorHandler(ele, component.template);
    let cn: ComponentNode = elementToComponentNode(ele);
    return function (targetConstructor: AbstractComponentConstructor) {
        for (let attr in injects) {
            targetConstructor.prototype[attr] = injects[attr];
        }
        ComponentManager.registerComponent(targetConstructor, cn);
    };
}

export function errorHandler(ele: Element, template: string) {
    let iter = document.createNodeIterator(ele, NodeFilter.SHOW_ELEMENT, {
        acceptNode: function (node) {
            return node.nodeName === 'parsererror' ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
        }
    }, false);
    let node: any = iter.nextNode();
    while (node !== null) {
        let line = node.innerText.match(/error on line (\d+).+/)[1];
        let message = node.innerText.match(/error on line.+:(.+)/)[1];
        let list = template.split('\n');
        let remain = list.splice(line - 3);
        let insert = list[list.length - 1].replace(/[^\s]/g, '\u25b2');
        list.push(insert);
        list = list.concat(remain);
        list.push('错误：' + message);
        console.error(list.join('\n'));
        node = iter.nextNode();
    }
}
