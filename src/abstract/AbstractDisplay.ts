import {LayaGame} from './LayaInterface';
import counter from './Counter';
import {AbstractSupportObject} from './AbstractSupport';

export interface AbstractDisplayObjectConstructor {
    $$require: Array<string>;
    $$optional: Array<string>;
    new(game: LayaGame, require: any, optional: any, id: number): AbstractDisplayObject;
}

export abstract class AbstractDisplayObject {
    private id: number;
    private children: Set<AbstractDisplayObject | AbstractSupportObject>;

    constructor(game, require, optional, id) {
        if (id < 0 || id === undefined) {
            this.id = counter();
        } else {
            this.id = id;
        }
        this.children = new Set<AbstractDisplayObject | AbstractSupportObject>();
        this.buildRealObject(game, require, optional);
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
    abstract buildRealObject(game: LayaGame, require: any, optional: any): void;
}
