import {LayaWorld, LayaGame} from './LayaInterface';
import {AbstractComponent} from './AbstractComponent';
import {Getter} from '../ctrl/DirectiveManager';
import ComponentManager from '../ctrl/ComponentManager';
import ViewModelManager from '../ctrl/ViewModelManager';
import StateManager from '../ctrl/StateManager';
import counter from './Counter';
import DisplayObjectManager from '../ctrl/DisplayObjectManager';

export interface AbstractSenceConstructor {
    new (): AbstractSence;
}

export class AbstractSence {
    refs: Map<string, any> = new Map<string, any>();
    private id: number;
    private subComponents: Array<AbstractComponent> = [];
    private layaGame: LayaGame;
    private getterProperty: Map<Getter, string> = new Map<Getter, string>();

    constructor() {
        this.id = counter();
    }

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
        this.layaGame = game;
    }

    destorySubComponent(): void {
        this.subComponents.forEach(v => {
            let id = v.getId();
            ComponentManager.deleteComponent(id);
            ViewModelManager.deleteViewModel(id);
            StateManager.delete(id);
        });
        this.subComponents = [];
    }

    getId(): number {
        return this.id;
    }
}
