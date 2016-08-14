import {AbstractComponent} from '../../component/AbstractComponent';
import Application from '../../ctrl/Application';

export default {
    name: 'bind',

    bind(cptName: string, cpt: AbstractComponent, target: any, argument: string, value: string, app: Application) {
        app.addDependencies(cptName, value, (([target], component, val) => {
            target[argument] = val;
        }).bind(null, [target]));
    },

    unbind() {
        console.log('un do');
    }
};
