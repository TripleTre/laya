import {AbstractComponent} from '../abstract/AbstractComponent';
import {AbstractSence} from '../abstract/AbstractSence';
import {ComponentNode} from '../ctrl/ComponentManager';
import {LayaContainer, LayaGame, LayaWorld} from '../abstract/LayaInterface';
import ViewModelManager from '../ctrl/ViewModelManager';
import ComponentManager from '../ctrl/ComponentManager';

export default {
    name: 'if',

    bind(own: AbstractComponent | AbstractSence, node: ComponentNode,
                          container: LayaContainer | LayaWorld, game: LayaGame, id: number = -1, argument: string, value: (context) => any, triggers: Array<string>) {
        triggers.forEach((v) => {
            if (own.hasOwnActiveProperty(v)) {
                ViewModelManager.addDependences(id, v, (newValue) => {
                    ComponentManager.deleteComponentRootCootainer(id);
                    ComponentManager.buildRootContainer(id);
                });
            } else {
                // console.warn(own.constructor['$$name'] + '组件，没有属性名为: ' + v + '的响应式属性.');
            }
        });
    },

    unbind() {
        console.log('un do');
    }
};
