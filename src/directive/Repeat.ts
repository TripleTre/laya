import {AbstractComponent} from '../abstract';
import {AbstractSence} from '../abstract';

export default {
    name: 'repeat',

    bind(cpt: AbstractComponent | AbstractSence, target: any, argument: string, value: (context) => any, triggers: Array<string>) {
        let list = value(cpt);
        if (typeof list === 'number') {
            let len = list;
            list = [];
            for (let i = 0; i < len; i++) {
                list[i] = i;
            }
        }
        let count = list.length;
        target['$$repeatCount'] = count;
        target['$$repeatName'] = argument;
        (<AbstractComponent>cpt).addToRepeatScope(argument, list);
    },

    unbind() {
        console.log('un do');
    }
};
