import {AbstractComponent} from '../abstract';
import {AbstractSence} from '../abstract';
import ViewModelManager from '../ctrl/ViewModelManager';
import ObjectManager from '../ctrl/ObjectManager';
import Is from '../util/Is';

export default {
    name: 'bind',

    bind(cpt: AbstractComponent | AbstractSence, target: any, argument: string, value: (context) => any, triggers: Array<string>) {
        let id     = cpt.getId();
        let targetId = target.getId();
        triggers.filter(v => cpt.hasOwnActiveProperty(v))
                .forEach((v) => {
                    if (cpt[v] !== undefined) {
                        if (target instanceof AbstractComponent) {
                            debugger;
                            // ViewModelManager.addDependences(id, v, (() => {
                            //     ViewModelManager.activePropertyForComponent(targetId, argument, );
                            // }));
                        } else { // 对于 displayObject 和 supportObject 直接给相应属性赋值即可
                            ViewModelManager.addDependences(id, v, ((contextId, targetId, value) => {
                                let target = ObjectManager.getObject(targetId);
                                let context = ObjectManager.getObject(contextId);
                                if (Is.isPresent(target) && Is.isPresent(context)) {
                                    target[argument] = value(context);
                                }
                            }).bind(null, id, targetId, value));
                        }
                    }
                });
    },

    unbind() {
        console.log('un do');
    }
};
