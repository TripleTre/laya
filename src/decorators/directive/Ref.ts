import {AbstractComponent} from '../../component/AbstractComponent';
import Application from '../../ctrl/Application';

export default {
    name: 'ref',

    bind(cptName: string, cpt: AbstractComponent, target: any, argument: string, value: string, app: Application) {
        if (target instanceof AbstractComponent) {
            console.warn('ref 指令不能使用在组件上');
            return;
        }
        cpt.refs.set(value.replace(/'/g, ''), target);
    },

    unbind() {
        console.log('un do');
    }
};
