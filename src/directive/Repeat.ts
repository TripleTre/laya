import {AbstractComponent} from '../abstract';
import {AbstractSence} from '../abstract';

export default {
    name: 'repeat',

    bind(cpt: AbstractComponent | AbstractSence, target: any, argument: string, value: (context) => any, triggers: Array<string>) {
        let list = value(cpt);
        let count = list.length;
        target['$$repeatCount'] = count;
        target['$$repeatName'] = argument;
        (<AbstractComponent>cpt).addToRepeatScope(argument, value(cpt));
    },

    unbind() {
        console.log('un do');
    }
};
