import {AbstractComponentConstructor} from '../component/AbstractComponent';
import app from '../index';

export interface ComponentLike {
    template: string;
}

export default function (component: ComponentLike) {
    let template: string = component.template;
    let paser = new DOMParser();
    let tree = paser.parseFromString(template, 'text/xml');
    return function (targetConstructor: AbstractComponentConstructor) {
        app.registerComponent(targetConstructor, tree);
    };
}
