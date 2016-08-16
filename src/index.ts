import {Bind,
        Ref} from './decorators/directive/index';
import {app} from './ctrl/Application';
import {data,
        prop,
        sence,
        getter,
        component} from './decorators/index';
import {AbstractSence,
        AbstractSenceConstructor} from './decorators/AbstractSence';
import {AbstractComponent,
        AbstractComponentConstructor} from './component/AbstractComponent';
import * as LayaObjects from './abstract/index';

app.setupDirective(Bind);
app.setupDirective(Ref);

export default app;

export {
    prop,
    data,
    sence,
    getter,
    component,
    AbstractSence,
    AbstractSenceConstructor,
    AbstractComponent,
    AbstractComponentConstructor,
    LayaObjects
};
