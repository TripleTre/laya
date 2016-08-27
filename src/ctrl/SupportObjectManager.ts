import {AbstractComponent} from '../abstract/AbstractComponent';
import {AbstractSence} from '../abstract/AbstractSence';
import {ComponentNode} from './ComponentManager';
import {Container, Game} from '../abstract/LayaAbstracts';
import {collectAttributes} from './DisplayObjectManager';
import Is from '../util/Is';
import DirectiveManager from './DirectiveManager';
import {AbstractSupport, AbstractSupportConstructor} from '../abstract/AbstractSupport';

export default class SupportObjectManger {
    static registers: Map<string, AbstractSupportConstructor> = new Map<string, AbstractSupportConstructor>();

    static buildSuppoertObject(own: AbstractComponent | AbstractSence,
                              node: ComponentNode, game: Game, container: Container): any {
        let name       = node.name;
        let registe    = SupportObjectManger.registers.get(name);
    }

    static registeSupportObject(newFunc: AbstractSupportConstructor) {
        let name = newFunc['name'];
        SupportObjectManger.registers.set(name, newFunc);
    }

    static hasSupport(name: string): boolean {
        return SupportObjectManger.registers.has(name);
    }

    static getSupport(name: string): AbstractSupportConstructor {
        return SupportObjectManger.registers.get(name);
    }
}
