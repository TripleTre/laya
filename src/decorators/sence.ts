import app from '../index';

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
    let template: string = component.template;
    let paser = new DOMParser();
    let tree = paser.parseFromString(template, 'text/xml');
    return function (targetConstructor: any) {
        console.log(targetConstructor);
        app.registerSence(targetConstructor, tree);
    };
}
