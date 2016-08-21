import {World, Game} from './LayaObject';
import {AbstractComponent} from './AbstractComponent';
import {Getter} from '../ctrl/DirectiveManager';
import ComponentManager from '../ctrl/ComponentManager';
import ViewModelManager from '../ctrl/ViewModelManager';

export interface AbstractSenceConstructor {
    new (): AbstractSence;
}

export abstract class AbstractSence {
    private subComponents: Array<AbstractComponent> = [];
    private game:          Game;
    private getterProperty: Map<Getter, string> = new Map<Getter, string>();
    refs: Map<string, any>;

    /**
     *  返回场景对象的所有子组件
     */
    getSubComponents(): Array<AbstractComponent> {
        return this.subComponents;
    }

    addSubComponent(component: AbstractComponent): void {
        this.subComponents.push(component);
    }

    getGame(): Game {
        return this.game;
    }

    setGame(game: Game): void {
        this.game = game;
    }

    addToGetterProperty(getter: Getter, property: string) {
        this.getterProperty.set(getter, property);
    }

    getGetterProperty(getter: Getter): string {
        return this.getterProperty.get(getter);
    }

    destorySubComponents() {
        this.subComponents.forEach(v => {
            ComponentManager.deleteComponent(v.getId());
            ViewModelManager.deleteViewModel(v.getId());
            v.destroy();
        });
    }

    abstract getWorld(): World;
    abstract preload(): void;
    abstract destroy(): void; // todo 暂时问号
}
