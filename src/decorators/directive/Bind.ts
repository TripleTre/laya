import {AbstractComponent} from '../../component/AbstractComponent';
import Application from '../../ctrl/Application';
import {expressionVars, expToFunction} from '../../util/LayaParse';

export default {
    name: 'bind',

    bind(cptName: string, cpt: AbstractComponent, target: any, argument: string, value: string, app: Application) {
        expressionVars(value).forEach((v) => {
            let fn: Function = expToFunction(value);
            if (target instanceof AbstractComponent) {
                app.addDependencies(cpt.getId(), v, (() => {
                    app.activePropOrGetter(target.constructor.name, target, argument, fn(app.getDataVm(cptName, cpt)));
                }));
            } else {
                app.addDependencies(cpt.getId(), v, (() => {
                    target[argument] = fn(app.getDataVm(cptName, cpt));
                }));
            }
        });
    },

    unbind() {
        console.log('un do');
    }
};
