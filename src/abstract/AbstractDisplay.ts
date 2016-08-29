import {LayaGame} from './LayaInterface';
import counter from './Counter';
import Is from '../util/Is';
import DisplayObjectManager from '../ctrl/DisplayObjectManager';
import {AbstractSupportObject} from './AbstractSupport';
import {AbstractComponent} from './AbstractComponent';

export interface AbstractDisplayObjectConstructor {
    $$require: Array<string>;
    $$optional: Array<string>;
    new(game: LayaGame, require: any, optional: any, id: number): AbstractDisplayObject;
}

export abstract class AbstractDisplayObject {
    private id: number;
    private children: Set<AbstractDisplayObject | AbstractSupportObject>;

    constructor(id) {
        if (id < 0) {
            this.id = counter();
        } else {
            this.id = id;
        }
        this.children = new Set<AbstractDisplayObject | AbstractSupportObject>();
    }

    getId(): number {
        return this.id;
    }

    addChildren(obj: AbstractDisplayObject | AbstractSupportObject): void {
        this.children.add(obj);
    }

    getChildren() {
        return this.children;
    }

    abstract getRealObject<T>(): T;
    abstract destroy(): void;
}
