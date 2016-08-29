import {LayaGame} from './LayaInterface';
import counter from './Counter';

export interface AbstractSupportObjectConstructor {
    $$require: Array<string>;
    $$optional: Array<string>;
    new(game: LayaGame, require: any, optional: any, id: number): AbstractSupportObject;
}

export abstract class AbstractSupportObject {
    private id: number;
    private children: Set<AbstractSupportObject>;

    constructor(id) {
        if (id < 0) {
            this.id = counter();
        } else {
            this.id = id;
        }
        this.children = new Set<AbstractSupportObject>();
    }

    getId(): number {
        return this.id;
    }

    addChildren(obj: AbstractSupportObject): void {
        this.children.add(obj);
    }

    getChildren() {
        return this.children;
    }
}
