import {AbstractComponent} from '../../abstract/AbstractComponent';
import {AbstractSence} from '../../abstract/AbstractSence';
import {expressionVars, expToFunction} from '../../parser/Expression';
import ViewModelManager from '../../ctrl/ViewModelManager';
import Is from '../../util/Is';

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
