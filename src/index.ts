import Bind from './decorators/directive/Bind';
import Ref from './decorators/directive/Ref';
import Repeat from './decorators/directive/Repeat';
import {data,
        prop,
        sence,
        getter,
        component,
        watch,
        support} from './decorators/index';
import {AbstractSence,
        AbstractSenceConstructor} from './abstract/AbstractSence';
import {AbstractComponent,
        AbstractComponentConstructor} from './abstract/AbstractComponent';
import {AbstractSupport, AbstractSupportConstructor} from './abstract/AbstractSupport';
import * as LayaAbstracts from './abstract/LayaAbstracts';
import DirectiveManager from './ctrl/DirectiveManager';
import laya from './ctrl/Laya';
import Wref from './decorators/directive/Wref';

DirectiveManager.addDirective(Bind);
DirectiveManager.addDirective(Ref);
DirectiveManager.addDirective(Repeat);
DirectiveManager.addDirective(Wref);

export {
    prop,
    data,
    sence,
    getter,
    support,
    component,
    AbstractSence,
    AbstractSenceConstructor,
    AbstractComponent,
    AbstractComponentConstructor,
    LayaAbstracts,
    watch,
    AbstractSupport,
    AbstractSupportConstructor
};

export default laya;
