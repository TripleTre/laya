import {LayaGame, LayaWorld} from './LayaInterface';
import {AbstractComponent} from './AbstractComponent';
import {ComponentNode} from './AbstractComponent';
import ComponentManager from '../ctrl/ComponentManager';
import ViewModelManager from '../ctrl/ViewModelManager';
import StateManager from '../ctrl/StateManager';
import counter from './Counter';
import {forEachKey} from '../util/Iter';
import SenceManager from '../ctrl/SenceManager';

export interface AbstractSenceConstructor {
    new (): AbstractSence;
}

interface SenceData {
    node:             ComponentNode;
    newFunc:          AbstractSenceConstructor;
}

export class AbstractSence {
    $$refs: any = Object.create(null);
    private id: number;
    private subComponents: Array<AbstractComponent> = [];
    private layaGame: LayaGame;
    // private getterProperty: Map<Getter, string> = new Map<Getter, string>();
    private repeatScope: Map<string, Array<any>> = new Map<string, Array<any>>();
    private repeatIndex: Map<string, number> = new Map<string, number>();
    private $$repeatAttrs: Set<string> = new Set<string>();
    private $$rootContainer: LayaWorld;

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

    destroySubComponent(): void {
        this.subComponents.forEach(v => {
            let id = v.getId();
            ComponentManager.deleteComponent(id);
            ViewModelManager.deleteViewModel(id);
            StateManager.delete(id);
        });
        this.subComponents = [];
    }

    destroySelf() {
        this.destroySubComponent();
        SenceManager.deleteSence(this.getId());
    }

    getId(): number {
        return this.id;
    }

    addToRepeatScope(name: string, value: any) {
        this.repeatScope.set(name, value);
        this.$$repeatAttrs.add(name);
        if (!this.hasOwnProperty(name)) {
            Object.defineProperty(this, name, {
                get() {
                    return this.repeatScope.get(name)[this.repeatIndex.get(name)];
                }
            });
        }
    }

    setRepeatIndex(name: string, index: number) {
        this.repeatIndex.set(name, index);
        if (!this.hasOwnProperty(name + 'Index')) {
            Object.defineProperty(this, name + 'Index', {
                get() {
                    return this.repeatIndex.get(name);
                }
            });
        }
    }

    hasOwnActiveProperty(name: string): boolean {
        let data = this.constructor['$$data'] || [];
        let prop = this.constructor['$$prop'] || [];
        let getter = this.constructor['$$getter'] || [];
        return data.concat(prop)
                   .concat(getter)
                   .indexOf(name) >= 0;
    }

    resetRepeatIndex() {
        forEachKey<string>(this.repeatIndex.keys(), (function (key) {
            this.repeatIndex.set(key, 0);
        }).bind(this));
    }

    generatorRepeatInfo() {
        let ret = Object.create(null);
        forEachKey<string>(this.repeatIndex.keys(), (function (key) {
            ret[key] = this.repeatIndex.get(key);
        }).bind(this));
        return ret;
    }

    setRootContainer(value: LayaWorld): void {
        this.$$rootContainer = value;
    }

    getRootContainer(): LayaWorld {
        return this.$$rootContainer;
    }
}
