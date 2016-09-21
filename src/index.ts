import * as layaAbstract from './abstract';
import {component,
        prop,
        sence,
        getter,
        data,
        support,
        display,
        watch} from './decorators/index';
import * as layaInterface from './abstract/LayaInterface';
import laya from './ctrl/Laya';
import displayObjects from './phaser/display';
import supportObjects from './phaser/support';
import GameBuilder from './util/GameBuilder';

laya.registerDisplayObject(displayObjects);
laya.registerSupportObject(supportObjects);

export {
    layaAbstract,
    layaInterface,
    prop,
    data,
    sence,
    getter,
    component,
    watch,
    support,
    display,
    GameBuilder
};

export default laya;
