import {AbstractComponent} from '../../abstract/AbstractComponent';
import {expressionVars, expToFunction} from '../../parser/Expression';
import ViewModelManager from '../../ctrl/ViewModelManager';

export default {
    name: 'bind',

    bind(cpt: AbstractComponent, target: any, argument: string, value: string) {
        let vars = expressionVars(value);
        let fn   = expToFunction(value, vars);
        vars.forEach((v) => {
            if (target instanceof AbstractComponent) {
                ViewModelManager.addDependences(cpt.getId(), v, (() => {
                    ViewModelManager.activePropertyForComponent(target, argument, fn(cpt));
                }));
            } else { // 对于 displayObject 直接给相应属性赋值即可
                ViewModelManager.addDependences(cpt.getId(), v, (() => {
                    target[argument] = fn(cpt);
                }));
            }
        });
    },

    unbind() {
        console.log('un do');
    }
};
