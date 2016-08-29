import {AbstractComponent} from '../abstract/AbstractComponent';
import {AbstractSence} from '../abstract/AbstractSence';
import {ComponentNode} from '../ctrl/ComponentManager';
import {LayaContainer, LayaGame} from '../abstract/LayaInterface';
import DisplayObjectManager from '../ctrl/DisplayObjectManager';
import ViewModelManager from '../ctrl/ViewModelManager';

export default {
    name: 'if',

    bind(context: AbstractComponent | AbstractSence,
                         value: Function, triggers: Array<string>, node: ComponentNode, game: LayaGame, container: LayaContainer, id: number) {
        let dep = (function ([value, node, game, container, id]) {
            if (value(this) === true) {
                DisplayObjectManager.buildDisplayObject(this, node, game, container, id);
            } else {
                DisplayObjectManager.getInstance(id).destroy();
            }
        }).bind(context, [value, node, game, container, id]);
        dep(value(context));
        triggers.forEach(v => {
            ViewModelManager.addDependences(context.getId(), v, dep);
        });
    },

    unbind() {
        console.log('un do');
    }
};
