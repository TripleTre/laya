import {DisplayObject, Container, Game} from '../abstract/LayaAbstracts';
import {AbstractComponent} from '../abstract/AbstractComponent';
import {AbstractSence} from '../abstract/AbstractSence';
import {ComponentNode} from '../ctrl/ComponentManager';
import ComponentManager from '../ctrl/ComponentManager';
import DisplayObjectManager from '../ctrl/DisplayObjectManager';
import Is from '../util/Is';

export default function container(build: Container, own: AbstractComponent | AbstractSence, node: ComponentNode, game: Game, container: Container) {
    let len = build['$$repeatCount'] || 1;
    for (let i = 0; i < len; i++) {
        if (build['$$repeatCount'] && build['$$repeatName']) {
            (<AbstractComponent>own).setRepeatIndex(build['$$repeatName'], i);
        }
        node.children.forEach(v => {
            if (ComponentManager.hasComponent(v.name)) {
                ComponentManager.buildComponent(own, v, build, game);
            } else {
                let sub = DisplayObjectManager.buildDisplayObject(own, v, game, build);
                if (Is.isPresent(sub)) {
                    build.add(sub);
                }
            }
        });
    }
    return build;
}
