import {AbstractComponent} from '../abstract/AbstractComponent';
import {AbstractSence} from '../abstract/AbstractSence';
import {ComponentNode} from '../ctrl/ComponentManager';
import {LayaContainer, LayaGame} from '../abstract/LayaInterface';
import DisplayObjectManager from '../ctrl/DisplayObjectManager';
import ViewModelManager from '../ctrl/ViewModelManager';
import SupportObjectManager from '../ctrl/SupportObjectManager';

export default {
    name: 'if',

    bind(context: AbstractComponent | AbstractSence,
                         value: Function, triggers: Array<string>, node: ComponentNode, game: LayaGame, container: LayaContainer, id: number, repeatName: string, repeatIndex: number) {
        let dep = (function ([value, node, game, container, id, repeatInfo]) {
            for (let attr in repeatInfo) {
                this.setRepeatIndex(attr, repeatInfo[attr]);
            }
            if (value(this) === true) {
                if (DisplayObjectManager.hasDisplay(node.name)) {
                    DisplayObjectManager.buildDisplayObject(this, node, game, container, id);
                } else if (SupportObjectManager) {
                    // SupportObjectManager.buildSupportObject(this, node, game, container, container);
                }
            } else {
                DisplayObjectManager.deleteDisplay(id);
            }
        }).bind(context, [value, node, game, container, id, context.generatorRepeatInfo()]);
        window['__dep'] = dep;
        triggers.forEach(v => {
            if (context.hasRepeatAttr(v)) {
                return;
            }
            ViewModelManager.addDependences(context.getId(), v, dep);
        });
    },

    unbind() {
        console.log('un do');
    }
};
