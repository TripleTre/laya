import {AbstractComponentConstructor} from '../components/abstract/AbstractComponent';
import app from '../ctrl/ApplicationOut';

declare interface ComponentLike {
    template: string;
}

export default function (component: ComponentLike) {
    console.log('component');
    let template: string = component.template;
    let paser = new DOMParser();
    let tree = paser.parseFromString(template, 'text/xml');
    return function (targetConstructor: AbstractComponentConstructor) {
        app.registerComponent(targetConstructor, tree);
    };
}
