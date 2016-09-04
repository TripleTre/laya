import {AbstractComponent} from '../abstract';
import {AbstractSence} from '../abstract';
import ViewModelManager from '../ctrl/ViewModelManager';

export default {
    name: 'bind',

    bind(cpt: AbstractComponent | AbstractSence, target: any, argument: string, value: (context) => any, triggers: Array<string>) {
        let id     = cpt.getId();
        triggers.filter(v => cpt.hasOwnActiveProperty(v))
                .forEach((v) => {
                    if (cpt[v] !== undefined) {
                        if (target instanceof AbstractComponent) {
                            ViewModelManager.addDependences(id, v, (() => {
                                ViewModelManager.activePropertyForComponent(target, argument, value(cpt));
                            }));
                        } else { // 对于 displayObject 和 supportObject 直接给相应属性赋值即可
                            ViewModelManager.addDependences(id, v, (() => {
                                target[argument] = value(cpt);
                            }));
                        }
                    }
                });
    },

    unbind() {
        console.log('un do');
    }
};
