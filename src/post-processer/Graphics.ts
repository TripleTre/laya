import {DisplayObject, Container, Game} from '../abstract/LayaAbstracts';
import {AbstractComponent} from '../abstract/AbstractComponent';
import {AbstractSence} from '../abstract/AbstractSence';
import {ComponentNode} from '../ctrl/ComponentManager';
import DisplayObjectManager from '../ctrl/DisplayObjectManager';
import {collectAttributes} from '../ctrl/DisplayObjectManager';
import Is from '../util/Is';

export default function graphics (instance: DisplayObject, own: AbstractComponent | AbstractSence, node: ComponentNode, game: Game, container: Container) {
    let graphics = instance.getRealObject<any>();
    node.children.forEach(v => {
        switch (v.name) {
            case 'Rectangle':
                let attrs = collectAttributes(v, own);
                graphics.drawRect(attrs.x, attrs.y, attrs.width, attrs.height);
                break;
            default:
        }
    });
    container.getRealObject<any>().add(graphics);
}
