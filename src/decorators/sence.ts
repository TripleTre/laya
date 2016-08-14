import app from '../ctrl/ApplicationOut';

const DEFAULT = {
    template: `
        <sence>
        </sence>
    `
};

declare interface SenceLike {
    template: string;
}

export default function (component: SenceLike = DEFAULT) {
    console.log('sence', component);
    let template: string = component.template;
    let paser = new DOMParser();
    let tree = paser.parseFromString(template, 'text/xml');
    return function (targetConstructor: any) {
        console.log(targetConstructor);
        app.registerSence(targetConstructor, tree);
    };
}
