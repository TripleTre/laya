import {AbstractComponent} from '../abstract/AbstractComponent';
import {AbstractSence} from '../abstract/AbstractSence';

export default {
    name: 'ref',

    bind(cpt: AbstractComponent | AbstractSence, target: any, argument: string, value: (context) => any, triggers: Array<string>) {
        if (target instanceof AbstractComponent) {
            console.warn('ref 指令不能使用在组件上');
            return;
        }
        cpt.$$refs[value(cpt).replace(/'/g, '')] = target;
    },

    unbind() {
        console.log('un do');
    }
};
