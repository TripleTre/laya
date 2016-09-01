import {AbstractComponent} from '../abstract/AbstractComponent';
import {AbstractSence} from '../abstract/AbstractSence';
import {ComponentNode} from '../ctrl/ComponentManager';
import {LayaContainer, LayaGame, LayaWorld} from '../abstract/LayaInterface';
import DisplayObjectManager from '../ctrl/DisplayObjectManager';
import ViewModelManager from '../ctrl/ViewModelManager';
import SupportObjectManager from '../ctrl/SupportObjectManager';
import ComponentManager from '../ctrl/ComponentManager';

export default {
    name: 'if',

    bind(own: AbstractComponent | AbstractSence, node: ComponentNode,
                          container: LayaContainer | LayaWorld, game: LayaGame, id: number = -1, argument: string, value: (context) => any, triggers: Array<string>) {
        triggers.forEach((v) => {
            if (own.hasRepeatAttr(v)) {
                return;
            }
            ViewModelManager.addDependences(id, v, (value) => {
                if (value === 'true') {
                    ComponentManager.buildComponent(own, node, container, game, id);
                } else {
                    ComponentManager.deleteComponent(id);
                }
            });
        });
    },

    unbind() {
        console.log('un do');
    }
};
