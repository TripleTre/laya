import {AbstractComponentConstructor} from '../abstract/AbstractComponent';
import {ComponentNode} from '../ctrl/ComponentManager';
import ComponentManager from '../ctrl/ComponentManager';
import {elementToComponentNode} from '../parser/Template';

export interface ComponentLike {
    template: string;
}

export default function (component: ComponentLike) {
    let template: string        = component.template;
    let paser:    DOMParser     = new DOMParser();
    let ele:      Element       = (paser.parseFromString(template, 'text/html')).body.firstElementChild;
    errorHandler(ele, component.template);
    let cn: ComponentNode = elementToComponentNode(ele);
    return function (targetConstructor: AbstractComponentConstructor) {
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
        let column = node.innerText.match(/column (\d+)/)[1];
        let message = node.innerText.match(/error on line.+:(.+)/)[1];
        let list = template.split('\n');
        let remain = list.splice(line - 3); // tslint:disable-line
        let insert = list[list.length - 1].replace(/./g, (a, b) => { // tslint:disable-line
            return b >= column ? '▲' : '';
        });
        list.push(insert);
        list.concat(remain);
        console.log(list.join(''));
        node = iter.nextNode();
    }
}
