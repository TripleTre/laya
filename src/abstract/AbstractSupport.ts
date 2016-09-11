import {LayaGame} from './LayaInterface';
import counter from './Counter';

export interface AbstractSupportObjectConstructor {
    $$require: Array<string>;
    $$optional: Array<string>;
    new(game: LayaGame, target: any, require: any, optional: any, id: number): AbstractSupportObject;
}

export abstract class AbstractSupportObject {
    private id: number;
    private children: Array<number>;

    constructor(id) {
        if (id < 0) {
            this.id = counter();
        } else {
            this.id = id;
        }
        this.children = [];
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

    abstract destroy();
}
