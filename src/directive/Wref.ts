import {AbstractComponent} from '../abstract';
import {AbstractSence} from '../abstract';

export default {
    name: 'wref',

    bind(cpt: AbstractComponent | AbstractSence, target: any, argument: string, value: (context) => any, triggers: Array<string>) {
        if (target instanceof AbstractComponent) {
            console.warn('wref 指令不能使用在组件上');
            return;
        }
        window[value(cpt).replace(/'/g, '')] = target;
    },

    unbind() {
        console.log('un do');
    }
};
