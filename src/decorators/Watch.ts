import ActivePropertyManager from '../ctrl/ActivePropertyManager';
import {AbstractComponent} from '../abstract/AbstractComponent';
import {AbstractSence} from '../abstract/AbstractSence';
import WatchFunctionManager from '../ctrl/WatchFunctionManager';

export default function(watch: string) {
    return function(target: AbstractComponent | AbstractSence, propertyKey: string, descriptor: PropertyDescriptor): any {
        let name = target.constructor['name'];
        WatchFunctionManager.addToWatchs(name, watch, propertyKey);
    };
}
