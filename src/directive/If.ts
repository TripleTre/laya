import {AbstractComponent} from '../abstract/AbstractComponent';
import {AbstractSence} from '../abstract/AbstractSence';

export default {
    name: 'if',

    bind(cpt: AbstractComponent | AbstractSence, target: any, argument: string, value: (context) => any, triggers: Array<string>) {
        // cpt.refs.set(value(cpt).replace(/'/g, ''), target);
    },

    unbind() {
        console.log('un do');
    }
};
