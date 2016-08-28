import {LayaContainer, LayaGame} from '../abstract/LayaInterface';
import {AbstractComponent} from '../abstract/AbstractComponent';
import {AbstractSence} from '../abstract/AbstractSence';
import {ComponentNode} from '../ctrl/ComponentManager';
import ComponentManager from '../ctrl/ComponentManager';
import DisplayObjectManager from '../ctrl/DisplayObjectManager';
import {collectAttributes} from '../ctrl/DisplayObjectManager';
import Is from '../util/Is';
import SupportObjectManager from '../ctrl/SupportObjectManager';

export default function shadow (instance: any, own: AbstractComponent | AbstractSence, node: ComponentNode, game: LayaGame, container: LayaContainer) {
    let len = instance['$$repeatCount'] || 1;
    for (let i = 0; i < len; i++) {
        if (instance['$$repeatCount'] && instance['$$repeatName']) {
            (<AbstractComponent>own).setRepeatIndex(instance['$$repeatName'], i);
        }
        node.children.forEach(v => {
            if (SupportObjectManager.hasSupport(v.name)) {
                SupportObjectManager.buildSupportObject(own, v, game, container);
            } else if (ComponentManager.hasComponent(v.name)) {
                ComponentManager.buildComponent(own, v, instance, game);
            } else if (DisplayObjectManager.hasDisplay(v.name)) {
                DisplayObjectManager.buildDisplayObject(own, v, game, container);
            }
        });
    }
}
