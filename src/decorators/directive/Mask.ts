import {AbstractComponent} from '../../abstract/AbstractComponent';
import {AbstractSence} from '../../abstract/AbstractSence';
import {expressionVars, expToFunction} from '../../parser/Expression';
import ViewModelManager from '../../ctrl/ViewModelManager';

export default {
    name: 'bind',

    bind(cpt: AbstractComponent | AbstractSence, target: any, argument: string, value: (context) => any, triggers: Array<string>) {
        let id   = cpt instanceof AbstractComponent ? cpt.getId() : cpt['id'];
        triggers.forEach((v) => {
            if (target instanceof AbstractComponent) {
                ViewModelManager.addDependences(id, v, (() => {
                    ViewModelManager.activePropertyForComponent(target, argument, value(cpt));
                }));
            } else { // 对于 displayObject 直接给相应属性赋值即可
                ViewModelManager.addDependences(id, v, (() => {
                    target[argument] = value(cpt);
                }));
            }
        });
    },

    unbind() {
        console.log('un do');
    }
};
