import {LayaContainer, LayaGame} from '../abstract/LayaInterface';
import {AbstractComponent} from '../abstract/AbstractComponent';
import {AbstractSence} from '../abstract/AbstractSence';
import {ComponentNode} from '../ctrl/ComponentManager';
import ComponentManager from '../ctrl/ComponentManager';
import DisplayObjectManager from '../ctrl/DisplayObjectManager';
import {collectAttributes} from '../ctrl/DisplayObjectManager';
import Is from '../util/Is';
import SupportObjectManager from '../ctrl/SupportObjectManager';
import {AbstractSupportObject} from '../abstract/AbstractSupport';

export default function shadow (instance: AbstractSupportObject, own: AbstractComponent | AbstractSence, node: ComponentNode, game: LayaGame, container: any) {
    let len = instance['$$repeatCount'] || 1;
    for (let i = 0; i < len; i++) {
        if (instance['$$repeatCount'] && instance['$$repeatName']) {
            (<AbstractComponent>own).setRepeatIndex(instance['$$repeatName'], i);
        }
        node.children.forEach(v => {
            if (SupportObjectManager.hasSupport(v.name)) {
                let s = SupportObjectManager.buildSupportObject(own, v, game, container);
                instance.addChildren(s);
            } else if (ComponentManager.hasComponent(v.name)) {
                let c = ComponentManager.buildComponent(own, v, container, game);
            } else if (DisplayObjectManager.hasDisplay(v.name)) {
                DisplayObjectManager.buildDisplayObject(own, v, game, container);
            }
        });
    }
}
