import {DisplayObject, Container, Game} from '../abstract/LayaAbstracts';
import {AbstractComponent} from '../abstract/AbstractComponent';
import {AbstractSence} from '../abstract/AbstractSence';
import {ComponentNode} from '../ctrl/ComponentManager';
import ComponentManager from '../ctrl/ComponentManager';
import DisplayObjectManager from '../ctrl/DisplayObjectManager';
import {collectAttributes} from '../ctrl/DisplayObjectManager';
import Is from '../util/Is';

export default function shadow (instance: any, own: AbstractComponent | AbstractSence, node: ComponentNode, game: Game, container: Container) {
    let len = instance['$$repeatCount'] || 1;
    for (let i = 0; i < len; i++) {
        if (instance['$$repeatCount'] && instance['$$repeatName']) {
            (<AbstractComponent>own).setRepeatIndex(instance['$$repeatName'], i);
        }
        node.children.forEach(v => {
            if (ComponentManager.hasComponent(v.name)) {
                ComponentManager.buildComponent(own, v, container, game);
            } else {
                DisplayObjectManager.buildDisplayObject(own, v, game, container);
            }
        });
    }
}
