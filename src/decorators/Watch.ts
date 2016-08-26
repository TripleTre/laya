import ActivePropertyManager from '../ctrl/ActivePropertyManager';
import {AbstractComponent} from '../abstract/AbstractComponent';
import {AbstractSence} from '../abstract/AbstractSence';
import WatchFunctionManager from '../ctrl/WatchFunctionManager';
import Is from '../util/Is';

export default function(watch: string) {
    return function(target: AbstractComponent | AbstractSence, propertyKey: string, descriptor: PropertyDescriptor): any {
        if (Is.isAbsent(target[propertyKey]) || typeof target[propertyKey] !== 'function') {
            throw new Error('@wacth 修饰的不是方法或方法不存在, find in ' + propertyKey);
        }
        let name = target.constructor['name'];
        WatchFunctionManager.addToWatchs(name, watch, propertyKey);
    };
}
