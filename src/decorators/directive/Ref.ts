import {AbstractComponent} from '../../component/AbstractComponent';
import Application from '../../ctrl/Application';

export default {
    name: 'ref',

    bind(cptName: string, cpt: AbstractComponent, target: any, argument: string, value: string, app: Application) {
        if (target instanceof AbstractComponent) {
            throw new Error('ref 指令不能使用在组件上');
        }
        cpt.refs.set(value, target);
    },

    unbind() {
        console.log('un do');
    }
};
