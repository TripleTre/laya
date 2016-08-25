import {World, Game} from './LayaAbstracts';
import {AbstractComponent} from './AbstractComponent';
import {Getter} from '../ctrl/DirectiveManager';
import ComponentManager from '../ctrl/ComponentManager';
import ViewModelManager from '../ctrl/ViewModelManager';
import StateManager from '../ctrl/StateManager';

export interface AbstractSenceConstructor {
    new (): AbstractSence;
}

export abstract class AbstractSence {
    refs: Map<string, any>;
    private subComponents: Array<AbstractComponent> = [];
    private layaGame:          Game;
    private getterProperty: Map<Getter, string> = new Map<Getter, string>();

    /**
     *  返回场景对象的所有子组件
     */
    getSubComponents(): Array<AbstractComponent> {
        return this.subComponents;
    }

    addSubComponent(component: AbstractComponent): void {
        this.subComponents.push(component);
    }

    getLayaGame(): Game {
        return this.layaGame;
    }

    setLayaGame(game: Game): void {
        this.layaGame = game;
    }

    destorySubComponent(): void {
        this.subComponents.forEach(v => {
            v.destroy();
            ComponentManager.deleteComponent(v.getId());
            StateManager.delete(v.getId());
        });
        this.subComponents = [];
    }

    abstract getWorld(): World;
    abstract preload(): void;
    abstract destroy(): void;
}
