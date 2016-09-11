import {LayaGame} from './LayaInterface';
import counter from './Counter';

export interface AbstractDisplayObjectConstructor {
    $$require: Array<string>;
    $$optional: Array<string>;
    new(game: LayaGame, require: any, optional: any, id: number): AbstractDisplayObject;
}

export abstract class AbstractDisplayObject {
    private id: number;
    private children: Array<number>;

    constructor(game, require, optional, id) {
        if (id < 0 || id === undefined) {
            this.id = counter();
        } else {
            this.id = id;
        }
        this.children = [];
        this.buildRealObject(game, require, optional);
    }

    getId(): number {
        return this.id;
    }

    addChildren(id: number): void {
        this.children.push(id);
    }

    getChildren() {
        return this.children;
    }

    abstract getRealObject<T>(): T;
    abstract destroy(): void;
    abstract buildRealObject(game: LayaGame, require: any, optional: any): void;
}
