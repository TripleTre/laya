import {AbstractComponent} from '../abstract/AbstractComponent';
import {AbstractSence} from '../abstract/AbstractSence';
import Is from '../util/Is';

export default function(watch: Array<string>) {
    return function(target: AbstractComponent | AbstractSence, propertyKey: string, descriptor: PropertyDescriptor): any {
        if (Is.isAbsent(target[propertyKey]) || typeof target[propertyKey] !== 'function') {
            throw new Error('@wacth 修饰的不是方法或方法不存在, find in ' + propertyKey);
        }
        if (target.constructor['$$watch'] === undefined) {
            target.constructor['$$watch'] = [];
        }
        watch.forEach(propertyName => {
            target.constructor['$$watch'].push({
                propertyName,
                propertyKey
            });
        });
    };
}
