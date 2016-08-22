import Bind from './decorators/directive/Bind';
import Ref from './decorators/directive/Ref';
import {data,
        prop,
        sence,
        getter,
        component} from './decorators/index';
import {AbstractSence,
        AbstractSenceConstructor} from './abstract/AbstractSence';
import {AbstractComponent,
        AbstractComponentConstructor} from './abstract/AbstractComponent';
import * as LayaObjects from './abstract/LayaObject';
import DirectiveManager from './ctrl/DirectiveManager';
import laya from './ctrl/Laya';

DirectiveManager.addDirective(Bind);
DirectiveManager.addDirective(Ref);

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

export default laya;
