import DisplayObjectManager from '../ctrl/DisplayObjectManager';

export default function (component: {require: Array<string>, optional?: Array<string>}) {
    let template: string        = component.template;
    let paser:    DOMParser     = new DOMParser();
    let ele:      Element       = <Element>(paser.parseFromString(template, 'text/xml')).firstChild;
    let cn:       ComponentNode = elementToComponentNode(ele);
    return function (targetConstructor: AbstractComponentConstructor) {
        ComponentManager.registerComponent(targetConstructor, cn);
    };
}
