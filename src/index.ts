import {Bind,
        Ref} from './decorators/directive/index';
import Application from './ctrl/Application';
import {data,
        sence,
        component} from './decorators/index';
import {AbstractSence,
        AbstractSenceConstructor} from './decorators/AbstractSence';
import {AbstractComponent,
        AbstractComponentConstructor} from './component/AbstractComponent';
import * as LayaObjects from './abstract/index';

let app = new Application();

app.setupDirective(Bind);
app.setupDirective(Ref);

export default app;

export {
    data,
    sence,
    component,
    AbstractSence,
    AbstractSenceConstructor,
    AbstractComponent,
    AbstractComponentConstructor,
    LayaObjects
};
