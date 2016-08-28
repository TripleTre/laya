import {LayaWorld, LayaGame} from './LayaInterface';
import {AbstractComponent} from './AbstractComponent';
import {Getter} from '../ctrl/DirectiveManager';
import ComponentManager from '../ctrl/ComponentManager';
import ViewModelManager from '../ctrl/ViewModelManager';
import StateManager from '../ctrl/StateManager';
import World from '../phaser/display/World';

export interface AbstractSenceConstructor {
    new (): AbstractSence;
}

export class AbstractSence {
    refs: Map<string, any> = new Map<string, any>();
    private subComponents: Array<AbstractComponent> = [];
    private layaGame: LayaGame;
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

    getLayaGame(): LayaGame {
        return this.layaGame;
    }

    setLayaGame(game: LayaGame): void {
        let w = game.getRealObject<Phaser.Game>().world;
        game.setWorld(new World(w));
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
}
