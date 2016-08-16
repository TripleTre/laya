import {AbstractComponent} from '../../component/AbstractComponent';
import Application from '../../ctrl/Application';
import {expressionVars, expToFunction} from '../../util/LayaParse';

export default {
    name: 'bind',

    bind(cptName: string, cpt: AbstractComponent, target: any, argument: string, value: string, app: Application) {
        expressionVars(value).forEach((v) => {
            let fn: Function = expToFunction(value);
            app.addDependencies(cptName, v, (([target], component) => {
                target[argument] = fn(app.getDataVm(cptName, cpt));
            }).bind(null, [target]));
        });
    },

    unbind() {
        console.log('un do');
    }
};
