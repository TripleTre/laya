import {LayaContainer, LayaGame} from '../abstract/LayaInterface';
import {AbstractComponent} from '../abstract/AbstractComponent';
import {AbstractSence} from '../abstract/AbstractSence';
import {ComponentNode} from '../ctrl/ComponentManager';
import ComponentManager from '../ctrl/ComponentManager';
import DisplayObjectManager from '../ctrl/DisplayObjectManager';
import Is from '../util/Is';
import SupportObjectManager from '../ctrl/SupportObjectManager';

export default function container(build: any, own: AbstractComponent | AbstractSence, node: ComponentNode, game: LayaGame, container: LayaContainer) {
    container.add(build);
    container.addChildren(build);
    let len = build['$$repeatCount'] || 1;
    for (let i = 0; i < len; i++) {
        if (build['$$repeatCount'] && build['$$repeatName']) {
            (<AbstractComponent>own).setRepeatIndex(build['$$repeatName'], i);
        }
        node.children.forEach(v => {
            if (SupportObjectManager.hasSupport(v.name)) {
                SupportObjectManager.buildSupportObject(own, v, game, build);
            } else if (ComponentManager.hasComponent(v.name)) {
                ComponentManager.buildComponent(own, v, build, game);
            } else if (DisplayObjectManager.hasDisplay(v.name)) {
                DisplayObjectManager.buildDisplayObject(own, v, game, build);
            } else {
                console.error(v.name + '标签没有对应的注册类!');
            }
        });
    }
}
